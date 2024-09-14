import MovieCard from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getTrendingThisWeek } from "@/utils/api";

export type Movie = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function LandingPage() {
  const { data } = useQuery({
    queryKey: ["popular_movies"],
    queryFn: getTrendingThisWeek,
    refetchOnWindowFocus: false,
  });

  const movies = data?.results;
  console.log(movies);
  return (
    <main>
      <ul className="grid grid-cols-5 gap-4">
        {movies?.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              name={movie.original_title}
              image={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
