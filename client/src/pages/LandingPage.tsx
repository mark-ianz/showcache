import MovieCard from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getNewReleases, getTrendingThisWeek } from "@/utils/api";

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
  const { data: trending_this_week } = useQuery({
    queryKey: ["trending_this_week"],
    queryFn: getTrendingThisWeek,
    staleTime: 1000 * 60 * 5,
  });

  const { data: new_releases } = useQuery({
    queryKey: ["new_releases"],
    queryFn: getNewReleases,
    staleTime: 1000 * 60 * 5,
  });

  const newReleases = new_releases?.results;
  const trending = trending_this_week?.results;

  return (
    <main className="flex flex-col gap-20">
      <section>
        <p className="text-2xl mb-3">Trending This Week</p>
        <ul className="grid grid-cols-5 gap-4">
          {trending?.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                name={movie.original_title}
                image={
                  "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
              />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p className="text-2xl mb-3">New Releases</p>
        <ul className="grid grid-cols-5 gap-4">
          {newReleases?.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                name={movie.original_title}
                image={
                  "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
