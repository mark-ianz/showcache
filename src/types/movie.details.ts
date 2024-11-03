import { FullDetails, Movie } from "./show";

export type BelongsToCollection = {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
};

export type MovieFullDetails = Movie & FullDetails & {
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  imdb_id: string;
  origin_country: string[];
  revenue: number;
  runtime: number;
};
