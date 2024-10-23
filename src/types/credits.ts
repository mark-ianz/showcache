import { LanguageCode } from "./language";

type Gender = 0 | 1 | 2;

type PersonBase = {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string; // img link
};

type Credits = PersonBase & {
  original_name: string;
  cast_id: number;
  credit_id: string;
};

export type Cast = Credits & {
  character: string;
  order: number;
};

export type Crew = Credits & {
  department: string;
  job: string;
};

export type CreditsResult = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type PersonFullInfo = PersonBase & {
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: Date | null;
  place_of_birth: string;
};

export type ExternalIds = {
  facebook_id: string;
  imdb_id: string;
  instagram_id: string;
  tiktok_id: string;
  tvrage_id: string;
  twitter_id: string;
  wikidata_id: string;
  youtube_id: string;
};

export type ValidExternalIds = {
  facebook_id: string;
  instagram_id: string;
  tiktok_id: string;
  twitter_id: string;
  youtube_id: string;
};

export type ShowCredits = {
  backdrop_path: string;
  original_title: string;
  poster_path: string;
  title: string;
  genre_ids: number[];
  id: number;
  original_language: LanguageCode;
  release_date: Date;
  vote_average: number;
  popularity: number;
};

export type CombinedCredits = {
  id: number;
  cast: ShowCredits[];
  crew: ShowCredits[];
};
