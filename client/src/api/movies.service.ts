import { API_Result, Movie } from "@/types/show";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config } from "./axios.config";
import { throwFetchError } from "@/lib/utils";
import { MovieFullDetails } from "@/types/movie.details";

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

export async function getMovieFullDetails({
  queryKey,
}: QueryFunctionContext): Promise<MovieFullDetails> {
  const [_key, language, id] = queryKey;
  const { data }: { data: MovieFullDetails } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    axios_config({ method: "GET", params: { language } })
  );

  return data;
}

export async function getRecommendations({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, id, page = 1] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`,
    axios_config({ method: "GET", params: { language } })
  );

  return data.results;
}
