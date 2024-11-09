import { searchCollection } from "@/api/movies.service";
import { LanguageCode } from "@/types/language";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../LoadingAnimation";
import { getImg } from "@/lib/helpers";

type Props = {
  query: string;
  language: LanguageCode;
};

export default function CollectionsContent({ query, language }: Props) {
  const {
    data: collections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection_search_results", language, query],
    queryFn: searchCollection,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (error) return <p>There was a server error. Please try again later.</p>;
  if (isLoading) return <LoadingAnimation />;
  if (!collections) return <p>No collections found</p>;

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
