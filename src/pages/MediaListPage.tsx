import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getPopularMovies, getNewReleases, getUpcomingMovies, getTopRated } from "@/api/movies.service";
import { getTv } from "@/api/tv.service";
import { getTrending } from "@/api/show.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";

export default function MediaListPage() {
  const { type, category } = useParams<{ type: string; category: string }>();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const isTrending = window.location.pathname.includes("trending");
  const mediaType = isTrending ? type : (window.location.pathname.includes("movie") ? "movie" : "tv");

  const getQueryFn = () => {
    if (isTrending) return getTrending;
    
    if (mediaType === "movie") {
      switch (category) {
        case "popular": return getPopularMovies;
        case "now-playing": return getNewReleases;
        case "upcoming": return getUpcomingMovies;
        case "top-rated": return getTopRated;
        default: return getPopularMovies;
      }
    } else {
      // TV categories: airing-today, popular, on-tv, top-rated
      // API expects: airing_today, popular, on_the_air, top_rated
      return getTv;
    }
  };

  const getQueryKey = () => {
    if (isTrending) return ["trending", mediaType, language];
    
    if (mediaType === "movie") {
      return [category || "popular", language];
    } else {
      let tvSort = category || "popular";
      if (tvSort === "airing-today") tvSort = "airing_today";
      if (tvSort === "on-the-air") tvSort = "on_the_air";
      if (tvSort === "top-rated") tvSort = "top_rated";
      return ["tv", language, tvSort];
    }
  };

  const { 
    data, 
    error, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteShows({
    queryKey: getQueryKey(),
    queryFn: getQueryFn() as any,
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  const getTitle = () => {
    if (isTrending) return `Trending ${mediaType === "movie" ? "Movies" : "TV Shows"}`;
    
    const catName = category?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Popular";
    return `${catName} ${mediaType === "movie" ? "Movies" : "TV Shows"}`;
  };

  return (
    <ListMainWrapper>
      <ShowSection
        error={error}
        loading={isLoading}
        showArray={data}
        title={getTitle()}
        subtitle={`Explore ${getTitle().toLowerCase()}`}
        isTv={mediaType === "tv"}
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
