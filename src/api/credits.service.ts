import axios from "axios";
import { axios_config } from "./axios.config";
import { CreditsResult, ExternalIds, PersonFullInfo } from "@/types/credits";
import { QueryFunctionContext } from "@tanstack/react-query";
import { Image } from "@/types/images";

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

export async function getPersonFullInfo ({
  queryKey,
}: QueryFunctionContext): Promise<PersonFullInfo> {
  const [_key, language, id] = queryKey;
  const { data }: { data: PersonFullInfo } = await axios.get(
    `https://api.themoviedb.org/3/person/${id}`,
    axios_config({ method: "GET", params: { language } })
  );

  return data;
}

export async function getPersonExternalIds ({
  queryKey,
}: QueryFunctionContext): Promise<ExternalIds> {
  const [_key, person_id] = queryKey;
  const { data }: { data: ExternalIds } = await axios.get(
    `https://api.themoviedb.org/3/person/${person_id}/external_ids`,
    axios_config({ method: "GET"})
  );

  return data;
}

export async function getPersonTaggedImages ({
  queryKey,
}: QueryFunctionContext): Promise<Image[]> {
  const [_key, person_id, page = 1] = queryKey;
  const { data }: { data: TaggedImages } = await axios.get(
    `https://api.themoviedb.org/3/person/${person_id}/tagged_images`,
    axios_config({ method: "GET", params: { page }})
  );

  return data.results;
}

export async function getPersonImages ({
  queryKey,
}: QueryFunctionContext): Promise<Image[]> {
  const [_key, person_id] = queryKey;
  const { data }: { data: Images } = await axios.get(
    `https://api.themoviedb.org/3/person/${person_id}/images`,
    axios_config({ method: "GET"})
  );

  return data.profiles;
}

type Images = {
  id: number,
  profiles: Image[]
}

type TaggedImages = {
  id: number,
  page: number,
  results: Image[],
  total_pages: number,
  total_results: number,
}