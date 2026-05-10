import { searchCollection } from "@/api/movies.service";
import { LanguageCode } from "@/types/language";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { getImg } from "@/lib/helpers";
import ErrorComponent from "../ErrorComponent";

type Props = {
  query: string;
  language: LanguageCode;
};

export default function CollectionsContent({ query, language }: Props) {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection_search_results", language, query],
    queryFn: searchCollection,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const collections = data?.results;

  if (error) return <ErrorComponent error={error as Error} />;
  if (isLoading) return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex border rounded-md shadow-sm">
          <Skeleton className="w-32 h-48 rounded-l-md rounded-r-none" />
          <div className="flex-1 p-4 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (collections?.length === 0 || !collections) return <p>No result found</p>;

  return (
    <div className="flex flex-col gap-4">
      {collections.map((collection, index) => (
        <div key={collection.name + index} className="flex border rounded-md shadow-md">
          <div className="min-w-32 w-32 h-48">
            <img
              src={getImg({
                path: collection.poster_path,
                size: "w300",
                mediaType: "show",
              })}
              className="object-cover object-center w-full h-full rounded-l-md"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 p-4">
            <h2 className="font-semibold text-lg">{collection.name}</h2>
            <p className="line-clamp-5">{collection.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
