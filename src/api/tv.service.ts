import axios from "axios";
import { axios_config } from "./axios.config";
import { API_Result, TV } from "@/types/show";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TvFullDetails } from "@/types/tv";

export async function getTv({ queryKey }: QueryFunctionContext): Promise<TV[]> {
  const [_key, language, sortOrPage, possiblePage] = queryKey;
  
  let sort = "popular";
  let page = 1;

  if (typeof sortOrPage === "string") {
    sort = sortOrPage;
    page = typeof possiblePage === "number" ? possiblePage : 1;
  } else if (typeof sortOrPage === "number") {
    page = sortOrPage;
  }

  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/tv/${sort}`,
    axios_config({ method: "GET", params: { language, page } })
  );
  return data.results || [];
}

export async function getTvFullDetails({
  queryKey,
}: QueryFunctionContext): Promise<TvFullDetails> {
  const [_key, language, id] = queryKey;
  const { data } = await axios.get<TvFullDetails>(
    `https://api.themoviedb.org/3/tv/${id}?language=${language}`,
    axios_config({ method: "GET" })
  );

  return data;
}

export async function getUpcomingTv({
  queryKey,
}: QueryFunctionContext): Promise<TV[]> {
  const [_key, language, page = 1] = queryKey;
  const { data } = await axios.get<API_Result>(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&sort_by=popularity.desc&language=${language}&page=${page}`,
    axios_config({
      method: "GET",
      params: { "first_air_date.gte": new Date().toISOString().split("T")[0] },
    })
  );
  return data.results || [];
}
