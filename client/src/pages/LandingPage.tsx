import {
  getNewReleases,
  getTrendingThisWeek,
  getTv,
  getUpcomingMovies,
} from "@/lib/api";
import ShowSection from "@/components/show/ShowSection";
import useShows, { useShowsProps } from "@/hooks/useShows";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import { URL } from "url";

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

type BelongsToCollection = {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type MovieFullDetails = Movie & {
  belongs_to_collection?: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: URL;
  imdb_id: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
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
