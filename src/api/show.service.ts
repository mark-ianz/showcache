import { Video, VideosResult } from "@/types/video";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config } from "./axios.config";
import { API_Result, Movie, ShowType, TV } from "@/types/show";
import { ImageResult } from "@/types/images";

export async function getTrailers({
  queryKey,
}: QueryFunctionContext): Promise<Video[]> {
  const [_key, type, language, id] = queryKey;
  const { data }: { data: VideosResult } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/videos`,
    axios_config({ method: "GET", params: { language } })
  );

  const trailers: Video[] = data.results.filter(
    (video) => video.type === "Trailer"
  );

  return trailers;
}

export async function getSearchResult({
  queryKey,
}: QueryFunctionContext): Promise<Movie[] | TV[]> {
  const [_key, language, query, searchFor, page] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/search/${searchFor}?include_adult=false`,
    axios_config({ method: "GET", params: { language, page, query } })
  );

  return data.results;
}

export async function getImages(
  id: number,
  type: ShowType
): Promise<ImageResult> {
  const { data }: { data: ImageResult } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/images`,
    axios_config({ method: "GET" })
  );

  return data;
}

export async function getMovieRecommendations({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language, id, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?language=${language}&page=${page}`,
    axios_config({ method: "GET" })
  );

  return data.results;
}

export async function getRecommendations({
  queryKey,
}: QueryFunctionContext): Promise<TV[] | Movie []> {
  const [_key, type, language, id, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=${language}&page=${page}`,
    axios_config({ method: "GET" })
  );

  return data.results;
}
