import { Movie, TV } from "@/pages/LandingPage";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config, throwFetchError } from "./utils";

type API_Result = {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
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
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, query, searchFor, page] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/search/${searchFor}?include_adult=false`,
    axios_config({ method: "GET", params: { language, page, query } })
  );
  return data.results;
}

// test