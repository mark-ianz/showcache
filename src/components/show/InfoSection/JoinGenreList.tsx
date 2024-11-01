import { ShowFullDetails } from "@/types/show";

type Props = { showData: ShowFullDetails };

export default function JoinGenreList({ showData }: Props) {
  const genreList = showData.genres.map((genre) => genre.name);

  return <p>{genreList?.join(" / ")}</p>;
}
