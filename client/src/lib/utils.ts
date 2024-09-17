import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { genres } from "./constants";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGenre(genre_ids: number[]): string[] {
  let genre_list: string[] = [];

  genre_ids.map((genre_id) => {
    for (const genre of genres) {
      if (genre.id === genre_id) {
        genre_list.push(genre.name);
      }
    }
  });

  return genre_list;
}

type AxiosConfig = {
  method: "GET" | "POST" | "DELETE" | "UPDATE";
  headers?: {};
  params?: {};
  data?: {};
};

export const axios_config = ({
  method,
  headers,
  params,
  data,
}: AxiosConfig) => {
  return {
    method,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH,
      ...headers,
    },
    params: {
      ...params,
    },
    data,
  };
};

export function throwFetchError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
    throw new Error("Failed to fetch. Please try again later.");
  } else {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
}
