import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getUpcomingMovies } from "@/api/movies.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";
import ShowListWrapper from "@/components/show/ShowListWrapper";

export default function UpcomingMovies() {
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
    queryKey: ["upcoming_movies", language],
    queryFn: getUpcomingMovies,
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
        showArray={data}
        error={error}
        loading={isLoading}
        title="Upcoming Movies"
        subtitle="Anticipated releases coming soon"
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
