import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getNewReleases } from "@/api/movies.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";

export default function NewReleases() {
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
    queryKey: ["new_releases", language],
    queryFn: getNewReleases,
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
        title="New Releases"
        subtitle="Freshly added to the database"
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
