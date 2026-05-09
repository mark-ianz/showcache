import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getTopRated } from "@/api/movies.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";
import ShowListWrapper from "@/components/show/ShowListWrapper";

export default function TopRated() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { 
    data, 
    error, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteShows({
    queryKey: ["top_rated_movies", language],
    queryFn: getTopRated,
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <ListMainWrapper>
      <ShowSection
        error={error}
        loading={isLoading}
        showArray={data}
        title="Top Rated Movies"
        subtitle="Highest rated films of all time"
      />
      {hasNextPage && (
        <div ref={targetRef} className="mt-8">
          {isFetchingNextPage && (
            <ShowListWrapper>
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <ShowCardSkeleton />
                </li>
              ))}
            </ShowListWrapper>
          )}
        </div>
      )}
    </ListMainWrapper>
  );
}
