import {
  getNewReleases,
  getTrendingThisWeek,
  getTv,
  getUpcomingMovies,
} from "@/lib/api";
import ShowSection from "@/components/show/ShowSection";
import useShows, { useShowsProps } from "@/hooks/useShows";
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

  if (
    trending_this_week.data &&
    new_releases.data &&
    upcoming_movies.data &&
    tv.data
  ) {
    return (
      <main className="flex flex-col gap-20 max-w-screen-2xl">
        <ShowSection
          showArray={trending_this_week.data}
          title="Trending This Week"
        />
        <ShowSection showArray={new_releases.data} title="New Releases" />
        <ShowSection showArray={upcoming_movies.data} title="Upcoming Movies" />
        <ShowSection showArray={tv.data} title="TV Shows" isTv />
      </main>
    );
  }
}
