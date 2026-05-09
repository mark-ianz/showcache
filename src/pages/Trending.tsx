import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getTrendingThisWeek } from "@/api/movies.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";
import ShowListWrapper from "@/components/show/ShowListWrapper";

export default function Trending() {
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
    queryKey: ["trending_movies", language],
    queryFn: getTrendingThisWeek,
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
        title="Trending Now"
        subtitle="Most viewed titles in the last 24 hours"
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
