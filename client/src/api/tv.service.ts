import axios from "axios";
import { axios_config } from "./axios.config";
import { API_Result, TV } from "@/types/show";
import { QueryFunctionContext } from "@tanstack/react-query";
import { TvFullDetails } from "@/types/tv";

export async function getTv({ queryKey }: QueryFunctionContext): Promise<TV[]> {
  const [_key, language, page, sort = "top_rated"] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    `https://api.themoviedb.org/3/tv/${sort}`,
    axios_config({ method: "GET", params: { language, page } })
  );
  return data.results;
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
