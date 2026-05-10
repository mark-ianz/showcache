import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { useInfiniteShows } from "@/hooks/useShows";
import { getPopularMovies, getNewReleases, getUpcomingMovies, getTopRated } from "@/api/movies.service";
import { getTv, getUpcomingTv } from "@/api/tv.service";
import { getTrending } from "@/api/show.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";

export default function MediaListPage({ category: propCategory }: { category?: string }) {
  const { type, category: paramCategory } = useParams<{ type: string; category: string }>();
  const category = propCategory || paramCategory;
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const isTrending = window.location.pathname.includes("trending") || category === "trending";
  const isNew = window.location.pathname.includes("new") || category === "new";
  const mediaType = isTrending || isNew ? (type || "all") : (window.location.pathname.includes("movie") ? "movie" : "tv");

  const getQueryFn = () => {
    if (isTrending) return getTrending;
    if (isNew) return getNewReleases;

    if (mediaType === "movie") {
      switch (category) {
        case "popular": return getPopularMovies;
        case "now-playing": return getNewReleases;
        case "upcoming": return getUpcomingMovies;
        case "top-rated": return getTopRated;
        default: return getPopularMovies;
      }
    } else {
      if (category === "upcoming") return getUpcomingTv;
      return getTv;
    }
  };

  const getQueryKey = () => {
    if (isTrending) return ["trending", mediaType, language];
    if (isNew) return ["new_releases", language];

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

  const queryKey = useMemo(() => getQueryKey(), [category, mediaType, language, isTrending, isNew]);
  const queryFn = useMemo(() => getQueryFn(), [category, mediaType, isTrending, isNew]);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteShows({
    queryKey,
    queryFn: queryFn as any,
    enabled: !!(queryKey && queryKey.length > 0 && queryFn),
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
    try {
      if (isTrending) {
        if (mediaType === "all") return "Trending Now";
        return `Trending ${mediaType === "movie" ? "Movies" : "TV Shows"}`;
      }
      if (isNew) return "Recent Releases";

      if (!category) return mediaType === "movie" ? "Popular Movies" : "Popular TV Shows";

      const catName = category.split("-").map(w => w?.charAt(0).toUpperCase() + w?.slice(1)).join(" ") || "Popular";
      return `${catName} ${mediaType === "movie" ? "Movies" : "TV Shows"}`;
    } catch (e) {
      return "Browse";
    }
  };

  const getSubtitle = () => {
    if (isTrending) {
      const noun = mediaType === "all" ? "titles" : (mediaType === "movie" ? "movies" : "series");
      return `Explore trending ${noun} now`;
    }
    if (isNew) return "Explore the freshest content from today";
    return `Explore ${getTitle().toLowerCase()}`;
  };

  return (
    <ListMainWrapper>
      <ShowSection
        error={error}
        loading={isLoading}
        showArray={data}
        title={getTitle()}
        subtitle={getSubtitle()}
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
