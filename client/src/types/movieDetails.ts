import { Genre } from "./genre";
import { Movie } from "./show";

type BelongsToCollection = {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
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