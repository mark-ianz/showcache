import { genres } from "@/constants/genres";
import no_person_image from "@/assets/no_person_image.png";
import no_show_image from "@/assets/no_show_image.png";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";
import { getDirectors } from "@/api/credits.service";
import { Location } from "react-router-dom";
import { Movie, ShowFullDetails, ShowType, TV } from "@/types/show";
import { format } from "date-fns";
import { ShowCredits } from "@/types/credits";
import { LanguageCode } from "@/types/language";
import { currency } from "@/constants/currency";

export function getGenre(genre_ids: number[]): string[] {
  const genre_list: string[] = [];

  genre_ids.map((genre_id) => {
    for (const genre of genres) {
      if (genre.id === genre_id) {
        genre_list.push(genre.name);
      }
    }
  });

  return genre_list;
}
export const getImg = ({
  path,
  size,
  undefineable,
  mediaType,
}: {
  path: string;
  size: "w300" | "w780" | "w1280" | "original";
  mediaType?: "show" | "person";
  undefineable?: boolean;
}) => {
  if (!path) {
    if (undefineable) return undefined;
    return mediaType === "show" ? no_show_image : no_person_image;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export function getShowName(
  showData: TvFullDetails | MovieFullDetails | Movie | TV | ShowCredits
): string {
  return "name" in showData ? showData.name : showData.title;
}

export function getShowDuration(showData: ShowFullDetails): string {
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

export function getShowYear(showData: ShowFullDetails): number {
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
  if (!date) {
    return "";
  }
  return format(date, dateFormat);
}

export function getShowType(
  show: TvFullDetails | MovieFullDetails | Movie | TV | ShowCredits
) {
  return "title" in show ? "movie" : "tv";
}

export function formatCurrency(
  value: number,
  iso_639_1: LanguageCode = "en",
  rates: Record<string, number>,
  isLoading: boolean
) {
  const currencyFormat =
    currency.find((c) => c.iso_639_1 === iso_639_1) || currency[0];

  if (isLoading) return "Loading...";
  if (rates) {
    const conversion_rate = rates[currencyFormat.currency] || 1;

    return new Intl.NumberFormat(currencyFormat?.locale || "en-US", {
      style: "currency",
      currency: currencyFormat?.currency || "USD",
    }).format(Number((value * conversion_rate).toFixed(2)));
  }
}
