import { Movie } from "@/pages/LandingPage";
import axios from "axios";

type API_Result = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export async function getPopularMovies(): Promise<API_Result> {
  try {
    const { data } = await axios.get("http://localhost:3000/popular");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch popular movies");
  }
}

export async function getTrendingThisWeek(): Promise<API_Result> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/trending"
  );
  return data;
}

export async function getNewReleases(): Promise<API_Result> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/new_releases"
  );
  return data;
}

export async function getUpcomingMovies(): Promise<API_Result> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/upcoming"
  );
  return data;
}


// eh
export async function getTvShows(): Promise<API_Result> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/upcoming"
  );
  return data;
}
