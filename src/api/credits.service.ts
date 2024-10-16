import axios from "axios";
import { axios_config } from "./axios.config";
import { CreditsResult } from "@/types/credits";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getDirectors(id: number): Promise<string[]> {
  const { data }: { data: CreditsResult } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    axios_config({ method: "GET" })
  );

  const directors = data.crew.filter((c) => c.job === "Director");

  return directors.map((director) => director.name);
}

export async function getCredits({
  queryKey,
}: QueryFunctionContext): Promise<CreditsResult> {
  const [_key, type, language, id] = queryKey;
  const { data }: { data: CreditsResult } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/credits`,
    axios_config({ method: "GET", params: { language } })
  );

  return data;
}
