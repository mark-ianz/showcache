import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config, throwFetchError } from "./utils";
import { Movie, TV } from "@/types/show";
import { MovieFullDetails } from "@/types/movieDetails";

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

type CreditsResult = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

type API_Result = {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: false;
  published_at: Date;
  id: string;
};

type VideosResult = {
  id: number;
  results: Video[];
};

export async function getPopularMovies({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, page] = queryKey;

  try {
    const { data }: { data: API_Result } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      axios_config({
        method: "GET",
        params: { language, page },
      })
    );
    return data.results;
  } catch (error) {
    throw new Error("Failed to fetch popular movies");
  }
}

export async function getTrendingThisWeek({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, date = "week"] = queryKey;
  try {
    const { data }: { data: API_Result } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${date}`,
      axios_config({
        method: "GET",
        params: { language },
      })
    );

    return data.results;
  } catch (error: unknown) {
    throwFetchError(error);
  }
}

export async function getNewReleases({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, page] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing",
    axios_config({
      method: "GET",
      params: { language, page },
    })
  );
  return data.results;
}

export async function getUpcomingMovies({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, page] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc",
    axios_config({
      method: "GET",
      params: { language, "primary_release_date.gte": new Date(), page },
    })
  );
  return data.results;
}

// eh
export async function getTv({ queryKey }: QueryFunctionContext): Promise<TV[]> {
  const [_key, language, page, sort = "top_rated"] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/tv/${sort}`,
    axios_config({ method: "GET", params: { language, page } })
  );
  return data.results;
}

export async function getTopRated({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    axios_config({ method: "GET", params: { language } })
  );
  return data.results;
}

export async function getSearchResult({
  queryKey,
}: QueryFunctionContext): Promise<Movie[] | TV[]> {
  const [_key, language, query, searchFor, page] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/search/${searchFor}?include_adult=false`,
    axios_config({ method: "GET", params: { language, page, query } })
  );

  console.log(data);
  return data.results;
}

export async function getOneMovie({
  queryKey,
}: QueryFunctionContext): Promise<MovieFullDetails> {
  const [_key, language, id] = queryKey;
  const { data }: { data: MovieFullDetails } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    axios_config({ method: "GET", params: { language } })
  );

  return data;
}

export async function getDirectors({
  queryKey,
}: QueryFunctionContext): Promise<Crew[]> {
  const [_key, language, id] = queryKey;
  const { data }: { data: CreditsResult } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    axios_config({ method: "GET", params: { language } })
  );

  const directors: Crew[] = data.crew.filter((c) => c.job === "Director");

  return directors;
}

export async function getTrailers({
  queryKey,
}: QueryFunctionContext): Promise<Video[]> {
  const [_key, language, id] = queryKey;
  const { data }: { data: VideosResult } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    axios_config({ method: "GET", params: { language } })
  );

  const trailers: Video[] = data.results.filter(
    (video) => video.type === "Trailer"
  );

  return trailers;
}

export async function getCredits({
  queryKey,
}: QueryFunctionContext): Promise<CreditsResult> {
  const [_key, language, id] = queryKey;
  const { data }: { data: CreditsResult } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    axios_config({ method: "GET", params: { language } })
  );

  console.log(data);
  return data;
}
