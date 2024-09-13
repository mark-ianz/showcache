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
  const { data } = await axios.get("http://localhost:3000/trending");
  console.log(data);
  return data;
}

export async function getTrendingMovies({
  queryKey,
}: getTrendingMoviesProps): Promise<API_Result> {
  const { data } = await axios.get("http://localhost:3000/trending", {
    params: {
      date: queryKey[1],
    },
  });
  console.log(data);
  return data;
}
