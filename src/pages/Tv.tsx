import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getTv } from "@/api/tv.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";
import ShowListWrapper from "@/components/show/ShowListWrapper";

export default function Tv() {
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
    queryKey: ["tv", language],
    queryFn: getTv,
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
        title="TV Shows"
        subtitle="Popular series and binge-worthy dramas"
        isTv
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
