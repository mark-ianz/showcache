import { Movie } from "@/pages/LandingPage";
import axios from "axios";

type API_Result = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function getPopularMovies(): Promise<API_Result> {
  const { data } = await axios.get("http://localhost:3000/popular");
  console.log(data);
  return data;
}
