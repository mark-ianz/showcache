import { Movie } from "@/pages/LandingPage";
import axios from "axios";

type API_Result = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type getTrendingMoviesProps = {
  queryKey: [string, "day" | "week"];
};

export async function getPopularMovies(): Promise<API_Result> {
  try {
    const { data } = await axios.get("http://localhost:3000/trending");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch popular movies");
  }
}

export async function getTrendingMovies({
  queryKey,
}: getTrendingMoviesProps): Promise<API_Result> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/trending",
    {
      params: {
        date: queryKey[1],
      },
    }
  );
  return data;
}
