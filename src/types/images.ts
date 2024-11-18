import { LanguageCode } from "./language";

export type Image = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: LanguageCode;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ShowQueriedImage = {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
};

export type TabImage = {
  file_path: string;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
};

export type CreditQueriedImage = {
  id: number,
  profiles: Image[]
}

export type TaggedImages = {
  id: number,
  page: number,
  results: Image[],
  total_pages: number,
  total_results: number,
}