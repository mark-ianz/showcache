import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getTrendingThisWeek } from "@/api/movies.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";

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
      >
        {hasNextPage && (
          <>
            {isFetchingNextPage && (
              Array.from({ length: 12 }).map((_, i) => (
                <li key={i}>
                  <ShowCardSkeleton />
                </li>
              ))
            )}
            <li ref={targetRef} className="col-span-full h-1" />
          </>
        )}
      </ShowSection>
    </ListMainWrapper>
  );
}
