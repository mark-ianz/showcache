import { searchCollection } from "@/api/movies.service";
import { LanguageCode } from "@/types/language";
import { useQuery } from "@tanstack/react-query";

type Props = {
  query: string;
  language: LanguageCode;
};

export default function CollectionsContent({ query, language }: Props) {
  const { data } = useQuery({
    queryKey: ["collection_search_results", language, query],
    queryFn: searchCollection,
    staleTime: 1000 * 60 * 60 * 24,
  });

  console.log(data);

  return <div>CollectionsContent</div>;
}
