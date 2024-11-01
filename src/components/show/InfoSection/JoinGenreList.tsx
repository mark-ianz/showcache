import { MovieFullDetails } from "@/types/movie.details";
import { TvFullDetails } from "@/types/tv";

type Props = { showData: MovieFullDetails | TvFullDetails };

export default function JoinGenreList({ showData }: Props) {
  const genreList = showData.genres.map((genre) => genre.name);

  return <p>{genreList?.join(" / ")}</p>;
}
