import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
