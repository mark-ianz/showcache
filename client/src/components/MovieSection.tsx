import { Movie } from "@/pages/LandingPage";
import MovieCard from "./MovieCard";
import MovieListWrapper from "./MovieListWrapper";

type MovieSectionProps = {
  movieArray: Movie[];
  title: string;
};

export default function MovieSection({ movieArray, title }: MovieSectionProps) {
  return (
    <section>
      <p className="text-2xl mb-3">{title}</p>
      <MovieListWrapper>
        {movieArray?.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              name={movie.title}
              image={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            />
          </li>
        ))}
      </MovieListWrapper>
    </section>
  );
}
