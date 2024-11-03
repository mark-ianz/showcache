import { Genre } from "./genre";
import { LanguageCode } from "./language";
import { MovieFullDetails } from "./movie.details";
import { TvFullDetails } from "./tv";

export type ShowType = "movie" | "tv";

export type Show = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: LanguageCode;
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

export type API_Result = {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountries = { iso_3166_1: string; name: string };

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type FullDetails = {
  production_companies: ProductionCompany[];
  production_countries: ProductionCountries[];
  status: string;
  genres: Genre[];
  tagline: string;
  homepage: string;
  imdb_id: string;
  spoken_languages: SpokenLanguage[];
};

export type ShowFullDetails = TvFullDetails | MovieFullDetails
