import { genres } from "@/constants/genres";
import no_image from "@/assets/no-image.png";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";
import { getDirectors } from "@/api/credits.service";
import { Location } from "react-router-dom";
import { Movie, ShowFullDetails, ShowType, TV } from "@/types/show";
import { format } from "date-fns";
import { ShowCredits } from "@/types/credits";

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

export function getShowName(
  showData: TvFullDetails | MovieFullDetails | Movie | TV | ShowCredits
): string {
  return "name" in showData ? showData.name : showData.title;
}

export function getShowDuration(
  showData: ShowFullDetails
): string {
  return "seasons" in showData
    ? showData.seasons
      ? `${showData.seasons.length} seasons`
      : "N/A"
    : showData.runtime
    ? `${showData.runtime} min`
    : "N/A";
}

export async function getShowDirectors(
  showData: ShowFullDetails
): Promise<string[]> {
  if ("created_by" in showData) {
    return showData.created_by.map((director) => director.name);
  }

  const directors = await getDirectors(showData.id);

  return directors || [];
}

export function getShowYear(
  showData: ShowFullDetails
): number {
  if ("first_air_date" in showData) {
    return new Date(showData.first_air_date).getFullYear();
  }

  return new Date(showData.release_date).getFullYear();
}

export function getShowTypeFromUseLocation(location: Location): ShowType {
  const { pathname } = location;
  const splitted = pathname.split("/");
  return splitted[1] as ShowType;
}

export function getGender(
  gender: 0 | 1 | 2
): "Male" | "Female" | "Not Specify" {
  switch (gender) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    default:
      return "Not Specify";
  }
}

export function formatDate(
  date: Date,
  dateFormat: string = "MMMM dd, yyyy"
): string {
  return format(date, dateFormat);
}

export function getShowType(show: TvFullDetails | MovieFullDetails | Movie | TV | ShowCredits) {
  return "title" in show ? "movie" : "tv";
}