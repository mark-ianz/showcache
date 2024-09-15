import { Movie } from "@/pages/LandingPage";
import axios from "axios";

type API_Result = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const { data } = await axios.get("http://localhost:3000/popular");
    return data.results;
  } catch (error) {
    throw new Error("Failed to fetch popular movies");
  }
}

export async function getTrendingThisWeek(): Promise<Movie[]> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/trending"
  );
  return data.results;
}

export async function getNewReleases(): Promise<Movie[]> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/new_releases"
  );
  return data.results;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/upcoming"
  );
  return data.results;
}

// eh
export async function getTvShows(): Promise<Movie[]> {
  const { data }: { data: API_Result } = await axios.get(
    "http://localhost:3000/upcoming"
  );
  return data.results;
}