import { Video, VideosResult } from "@/types/video";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config } from "./axios.config";
import { API_Result, Movie, TV } from "@/types/show";
import { ImageResult } from "@/types/images";

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

export async function getImages({
  queryKey,
}: QueryFunctionContext): Promise<ImageResult> {
  const [_key, language, type, id] = queryKey;
  const { data }: { data: ImageResult } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/images`,
    axios_config({ method: "GET", params: { language } })
  );

  return data;
}
