import { API_Result, Movie } from "@/types/show";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config } from "./axios.config";
import { throwFetchError } from "@/lib/utils";
import { CollectionDetails, CollectionSearchResult, MovieFullDetails } from "@/types/movie.details";
import { ShowQueriedImage } from "@/types/images";

export async function getPopularMovies({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, page = 1] = queryKey;

  try {
    const { data } = await axios.get<API_Result>(
      `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`,
      axios_config({
        method: "GET",
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
  const [_key, language] = queryKey;
  try {
    const { data } = await axios.get<API_Result>(
      `https://api.themoviedb.org/3/trending/movie/week?language=${language}`,
      axios_config({
        method: "GET",
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
  const [_key, language, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/movie/now_playing?language=${language}&page=${page}`,
    axios_config({
      method: "GET",
    })
  );
  return data.results;
}

export async function getUpcomingMovies({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&language=${language}&page=${page}`,
    axios_config({
      method: "GET",
      params: { "primary_release_date.gte": new Date() },
    })
  );
  return data.results;
}

export async function getTopRated({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=${page}`,
    axios_config({ method: "GET" })
  );
  return data.results;
}

export async function getMovieFullDetails({
  queryKey,
}: QueryFunctionContext): Promise<MovieFullDetails> {
  const [_key, language, id] = queryKey;
  const { data } = await axios.get<MovieFullDetails>(
    `https://api.themoviedb.org/3/movie/${id}?language=${language}`,
    axios_config({ method: "GET" })
  );
  return data;
}

export async function getCollectionDetails({
  queryKey,
}: QueryFunctionContext): Promise<CollectionDetails> {
  const [_key, language, id] = queryKey;
  const { data } = await axios.get<CollectionDetails>(
    `https://api.themoviedb.org/3/collection/${id}?language=${language}`,
    axios_config({ method: "GET" })
  );
  return data;
}

export async function searchCollection ({
  queryKey,
}: QueryFunctionContext): Promise<CollectionSearchResult[]> {
  const [_key, language, query, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/search/collection`,
    axios_config({ method: "GET", params: { include_adult: false, query, language, page } })
  );
  return data.results;
}

export async function getCollectionImages({
  queryKey,
}: QueryFunctionContext): Promise<ShowQueriedImage> {
  const [_key, id, language] = queryKey;
  const { data } = await axios.get<ShowQueriedImage>(
    `https://api.themoviedb.org/3/collection/${id}/images`,
    axios_config({ method: "GET", params: { language } })
  );
  return data;
}