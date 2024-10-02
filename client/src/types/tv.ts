import { Crew } from "./credits";
import { LanguageCode } from "./language";
import { FullDetails, TV } from "./show";

type Season = {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type TvFullDetails = TV &
  FullDetails & {
    created_by: Crew[];
    episode_run_time: any[];
    in_production: boolean;
    languages: LanguageCode[];
    last_air_date: Date;
    last_episode_to_air: Episode;
    next_episode_to_air: Episode | null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    seasons: Season[];
    type: string;
  };
