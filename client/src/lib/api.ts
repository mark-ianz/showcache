import { Movie } from "@/pages/LandingPage";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

type API_Result = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export async function getPopularMovies({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language] = queryKey;

  try {
    const { data } = await axios.get("http://localhost:3000/popular", {
      params: { language },
    });
    return data.results;
  } catch (error) {
    throw new Error("Failed to fetch popular movies");
  }
}

export async function getTrendingThisWeek({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/trending",
    {
      params: { language },
    }
  );

  return data.results;
}

export async function getNewReleases({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/new_releases",
    {
      params: { language },
    }
  );
  return data.results;
}

export async function getUpcomingMovies({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/upcoming",
    {
      params: { language },
    }
  );
  return data.results;
}

// eh
export async function getTvShows({
  queryKey,
}: QueryFunctionContext): Promise<Movie[]> {
  const [_key, language] = queryKey;
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/upcoming",
    {
      params: { language },
    }
  );
  return data.results;
}
