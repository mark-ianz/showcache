import { Movie, TV } from "@/types/show";
import { QueryFunctionContext, useQuery, useInfiniteQuery } from "@tanstack/react-query";

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

  return { 
    data: Array.isArray(data) ? data : undefined, 
    isError, 
    isLoading, 
    error 
  };
}

export function useInfiniteShows({
  queryKey,
  queryFn,
}: useShowsProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey,
    queryFn: (ctx) => queryFn({ ...ctx, queryKey: [...queryKey, ctx.pageParam] }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
  });
  const flattenedData = Array.isArray(data?.pages) 
    ? data.pages.flat() 
    : [];

  return {
    data: flattenedData as (Movie | TV)[],
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  };
}

