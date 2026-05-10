import { Movie, TV } from "@/types/show";
import { QueryFunctionContext, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
  enabled = true,
}: useShowsProps & { enabled?: boolean }) {
  const safeKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  const infiniteQueryKey = [...safeKey, "infinite"];

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: infiniteQueryKey,
    queryFn: (ctx) => {
      const pageParam = ctx.pageParam as number;
      return queryFn({ ...ctx, queryKey: [...safeKey, pageParam] });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages: any[]) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    enabled: enabled && !!queryKey && !!queryFn,
    staleTime: 1000 * 60 * 5,
  });

  const flattenedData = useMemo(() => {
    return (data?.pages && Array.isArray(data.pages))
      ? data.pages.flat().filter(Boolean)
      : [];
  }, [data?.pages]);

  return {
    data: flattenedData as (Movie | TV)[],
    error,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  };
}

