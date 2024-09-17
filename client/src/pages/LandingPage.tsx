import {
  getNewReleases,
  getTrendingThisWeek,
  getTv,
  getUpcomingMovies,
} from "@/lib/api";
import ShowSection from "@/components/show/ShowSection";
import useShows, { useShowsProps } from "@/hooks/useShows";
import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";

type Show = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type Movie = Show & {
  original_title: string;
  release_date: Date;
  title: string;
};

export type TV = Show & {
  origin_country: string[];
  original_name: string;
  first_air_date: Date;
  name: string;
};

const useData = ({ queryKey, queryFn }: useShowsProps) => {
  return useShows({
    queryKey,
    queryFn,
  });
};

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

  return (
    <ListMainWrapper>
      <ShowSection
        showArray={trending_this_week.data}
        error={trending_this_week.error}
        loading={trending_this_week.isLoading}
        title="Trending This Week"
      />
      <ShowSection
        showArray={new_releases.data}
        error={new_releases.error}
        loading={new_releases.isLoading}
        title="New Releases"
      />
      <ShowSection
        showArray={upcoming_movies.data}
        error={upcoming_movies.error}
        loading={upcoming_movies.isLoading}
        title="Upcoming Movies"
      />
      <ShowSection
        showArray={tv.data}
        error={tv.error}
        loading={tv.isLoading}
        title="TV Shows"
        isTv
      />
    </ListMainWrapper>
  );
}
