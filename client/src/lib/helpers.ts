import { genres } from "@/constants/genres";
import no_image from "@/assets/no-image.png";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";

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
  showData: TvFullDetails | MovieFullDetails
): string {
  return "name" in showData ? showData.name : showData.title;
}

export function getShowDuration(
  showData: TvFullDetails | MovieFullDetails
): string {
  return "seasons" in showData
    ? showData.seasons
      ? `${showData.seasons.length} seasons`
      : "N/A"
    : showData.runtime
    ? `${showData.runtime} min`
    : "N/A";
}
