import { Movie } from "@/pages/LandingPage";
import { useQuery } from "@tanstack/react-query";

type useMoviesProps = {
  queryKey: any[];
  queryFn: () => Promise<Movie[]>;
};

type useMoviesReturn = {
  data: Movie[] | undefined;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
};

export default function useMovies({
  queryKey,
  queryFn,
}: useMoviesProps): useMoviesReturn {
  const { data, isError, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isError, isLoading, error };
}
