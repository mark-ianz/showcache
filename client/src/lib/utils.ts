import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { genres } from "@/constants/genres";
import no_image from "@/assets/no-image.png";

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

export function throwFetchError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
    throw new Error("Failed to fetch. Please try again later.");
  } else {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
}

export const getImg = (
  path: string,
  size: "w300" | "w780" | "w1280" | "original",
  undefineable?: boolean
) => {
  if (!path) {
    if (undefineable) return undefined;
    return no_image;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
