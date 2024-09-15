import {
  getNewReleases,
  getTrendingThisWeek,
  getTv,
  getUpcomingMovies,
} from "@/lib/api";
import ShowSection from "@/components/show/ShowSection";
import useMovies from "@/hooks/useMovies";
import { useLanguage } from "@/components/context/language-provider";

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

export default function LandingPage() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const {
    data: trending_this_week,
    error: trending_this_week_error,
    isLoading: is_trending_this_week_loading,
    isError: is_trending_this_week_error,
  } = useMovies({
    queryKey: ["trending_this_week", language],
    queryFn: getTrendingThisWeek,
  });

  const {
    data: new_releases,
    error: new_releases_error,
    isLoading: is_new_releases_loading,
    isError: is_new_releases_error,
  } = useMovies({
    queryKey: ["new_releases", language],
    queryFn: getNewReleases,
  });

  const {
    data: upcoming_movies,
    error: upcoming_movies_error,
    isError: is_upcoming_movies_error,
    isLoading: is_upcoming_movies_loading,
  } = useMovies({
    queryKey: ["upcoming_movies", language],
    queryFn: getUpcomingMovies,
  });

  const {
    data: tv,
    error: tv_error,
    isError: is_tv_error,
    isLoading: is_tv_loading,
  } = useMovies({
    queryKey: ["tv", language],
    queryFn: getTv,
  });

  if (
    is_trending_this_week_loading ||
    is_new_releases_loading ||
    is_upcoming_movies_loading ||
    is_tv_loading
  ) {
    return <p>Loading...</p>;
  }

  if (
    is_new_releases_error ||
    is_trending_this_week_error ||
    is_upcoming_movies_error ||
    is_tv_error
  ) {
    return (
      <p>
        {trending_this_week_error?.message ||
          new_releases_error?.message ||
          upcoming_movies_error?.message ||
          tv_error?.message}
      </p>
    );
  }

  if (trending_this_week && new_releases && upcoming_movies && tv) {
    return (
      <main className="flex flex-col gap-20">
        <ShowSection
          showArray={trending_this_week.slice(0, 9)}
          title="Trending This Week"
        />
        <ShowSection
          showArray={new_releases.slice(0, 9)}
          title="New Releases"
        />
        <ShowSection
          showArray={upcoming_movies.slice(0, 9)}
          title="Upcoming Movies"
        />
        <ShowSection
          showArray={tv.slice(0, 9)}
          title="TV Shows"
          isTv
        />
      </main>
    );
  }
}
