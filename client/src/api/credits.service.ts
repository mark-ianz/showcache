import axios from "axios";
import { axios_config } from "./axios.config";
import { CreditsResult, Crew } from "@/types/credits";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getDirectors({
  queryKey,
}: QueryFunctionContext): Promise<Crew[]> {
  const [_key,type, language, id] = queryKey;
  const { data }: { data: CreditsResult } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/credits`,
    axios_config({ method: "GET", params: { language } })
  );

  const directors: Crew[] = data.crew.filter((c) => c.job === "Director");

  return directors;
}

export async function getCredits({
  queryKey,
}: QueryFunctionContext): Promise<CreditsResult> {
  const [_key,type, language, id] = queryKey;
  const { data }: { data: CreditsResult } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/credits`,
    axios_config({ method: "GET", params: { language } })
  );

  return data;
}