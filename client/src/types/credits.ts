type Gender = 0 | 1 | 2;

type Credits = {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string; // img link
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
