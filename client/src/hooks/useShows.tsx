import { Movie, TV } from "@/pages/LandingPage";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export type useShowsProps = {
  queryKey: any[];
  queryFn: (context: QueryFunctionContext) => Promise<Movie[] | TV[]>;
};

type useShowsReturn = {
  data: Movie[] | TV[] | undefined;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
};

export default function useShows({
  queryKey,
  queryFn,
}: useShowsProps): useShowsReturn {
  const { data, isError, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isError, isLoading, error };
}
