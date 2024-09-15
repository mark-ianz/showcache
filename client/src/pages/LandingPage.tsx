import {
  getNewReleases,
  getTrendingThisWeek,
  getUpcomingMovies,
} from "@/lib/api";
import MovieSection from "@/components/MovieSection";
import useMovies from "@/hooks/useMovies";
import { useLanguage } from "@/components/context/language-provider";

export type Movie = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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

  if (
    is_trending_this_week_loading ||
    is_new_releases_loading ||
    is_upcoming_movies_loading
  ) {
    return <p>Loading...</p>;
  }

  if (
    is_new_releases_error ||
    is_trending_this_week_error ||
    is_upcoming_movies_error
  ) {
    return (
      <p>
        {trending_this_week_error?.message ||
          new_releases_error?.message ||
          upcoming_movies_error?.message}
      </p>
    );
  }

  if (trending_this_week && new_releases && upcoming_movies) {
    return (
      <main className="flex flex-col gap-20">
        <MovieSection
          movieArray={trending_this_week.slice(0, 18)}
          title="Trending This Week"
        />
        <MovieSection
          movieArray={new_releases.slice(0, 18)}
          title="New Releases"
        />
        <MovieSection
          movieArray={upcoming_movies.slice(0, 18)}
          title="Upcoming Movies"
        />
      </main>
    );
  }
}
