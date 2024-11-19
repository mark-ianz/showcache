import { Video, VideosResult } from "@/types/video";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { axios_config } from "./axios.config";
import { API_Result, Movie, TV } from "@/types/show";
import { ShowQueriedImage } from "@/types/images";
import { CombinedCredits, PersonSearch, ShowCredits } from "@/types/credits";

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

export async function searchShow({
  queryKey,
}: QueryFunctionContext): Promise<Movie[] | TV[]> {
  const [_key, language, query, searchFor, page] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/search/${searchFor}?include_adult=false`,
    axios_config({ method: "GET", params: { language, page, query } })
  );

  return data.results;
}

export async function searchPerson ({
  queryKey,
}: QueryFunctionContext): Promise<PersonSearch[]> {
  const [_key, language, query, page = 1] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/search/person?include_adult=false`,
    axios_config({ method: "GET", params: { language, page, query } })
  );

  return data.results;
}

export async function getShowImages({
  queryKey,
}: QueryFunctionContext): Promise<ShowQueriedImage> {
  const [_key, id, type] = queryKey;
  const { data } = await axios.get<ShowQueriedImage>(
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
}: QueryFunctionContext): Promise<TV[] | Movie[]> {
  const [_key, type, language, id, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=${language}&page=${page}`,
    axios_config({ method: "GET" })
  );

  return data.results;
}

export async function getCombinedCredits({
  queryKey,
}: QueryFunctionContext): Promise<ShowCredits[]> {
  const [_key, language, id] = queryKey;
  const { data } = await axios.get<CombinedCredits>(
    `https://api.themoviedb.org/3/person/${id}/combined_credits`,
    axios_config({ method: "GET", params: { language } })
  );

  // cpmbine the cast and crew
  const combined = data.cast.concat(data.crew);

  const uniqueMap = new Map();
  for (const show of combined) {
    if (!uniqueMap.has(show.id)) {
      uniqueMap.set(show.id, show);
    }
  }

  const uniqueShows = Array.from(uniqueMap.values());

  // sort the combined by popularity and sliced the array to 20
  return uniqueShows
    .filter((show: ShowCredits) => show.popularity > 50)
    .splice(0, 20);
}

export async function getKeywords ({
  queryKey,
}: QueryFunctionContext): Promise<string[]> {
  const [_key, type, id] = queryKey;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/keywords`,
    axios_config({ method: "GET" })
  );

  return data.keywords.map((keyword: { name: string }) => keyword.name);
}