type Props = { genreList: string[] };

export default function JoinGenreList({ genreList }: Props) {
  return <p>{genreList?.join(" / ")}</p>;
}
