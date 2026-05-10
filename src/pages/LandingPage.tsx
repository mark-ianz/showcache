import ShowSection from "@/components/show/ShowSection";
import useShows, { useShowsProps } from "@/hooks/useShows";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import { getNewReleases, getTrendingThisWeek, getUpcomingMovies } from "@/api/movies.service";
import { getTv, getUpcomingTv } from "@/api/tv.service";

const useData = ({ queryKey, queryFn }: useShowsProps) => {
  return useShows({
    queryKey,
    queryFn,
  });
};

import Hero from "@/components/show/Hero";
import HeroSkeleton from "@/components/show/HeroSkeleton";

export default function LandingPage() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const trending_this_week = useData({
    queryKey: ["trending_this_week", language],
    queryFn: getTrendingThisWeek,
  });

  const new_releases = useData({
    queryKey: ["new_releases", language],
    queryFn: getNewReleases,
  });

  const upcoming_movies = useData({
    queryKey: ["upcoming_movies", language],
    queryFn: getUpcomingMovies,
  });
  const tv = useData({
    queryKey: ["tv", language],
    queryFn: getTv,
  });
  const upcoming_tv = useData({
    queryKey: ["upcoming_tv", language],
    queryFn: getUpcomingTv,
  });

  return (
    <ListMainWrapper>
      {trending_this_week.isLoading ? (
        <HeroSkeleton />
      ) : (
        <Hero movie={trending_this_week.data?.[0]} />
      )}

      <ShowSection
        showArray={trending_this_week.data}
        error={trending_this_week.error}
        loading={trending_this_week.isLoading}
        title="Trending Now"
        subtitle="Most viewed titles in the last 24 hours"
        isCarousel
        exploreLink="/trending"
      />
      <ShowSection
        showArray={new_releases.data}
        error={new_releases.error}
        loading={new_releases.isLoading}
        title="New Releases"
        subtitle="Freshly added to the database"
        isCarousel
        exploreLink="/new"
      />
      <ShowSection
        showArray={upcoming_movies.data}
        error={upcoming_movies.error}
        loading={upcoming_movies.isLoading}
        title="Upcoming Movies"
        subtitle="Anticipated releases coming soon"
        isCarousel
        exploreLink="/movie/upcoming"
      />
      <ShowSection
        showArray={upcoming_tv.data}
        error={upcoming_tv.error}
        loading={upcoming_tv.isLoading}
        title="Upcoming TV Shows"
        subtitle="Highly anticipated series premieres"
        isTv
        isCarousel
        exploreLink="/tv/upcoming"
      />
      <ShowSection
        showArray={tv.data}
        error={tv.error}
        loading={tv.isLoading}
        title="TV Shows"
        subtitle="Popular series and binge-worthy dramas"
        isTv
        isCarousel
        exploreLink="/tv"
      />
    </ListMainWrapper>
  );
}
