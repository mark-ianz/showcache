import { searchShow } from "@/api/show.service";
import ShowSection from "../show/ShowSection";
import { useQuery } from "@tanstack/react-query";
import { LanguageCode } from "@/types/language";
import { ShowType } from "@/types/show";

type Props = {
  query: string;
  language: LanguageCode;
  searchFor: ShowType;
};

export default function ShowContent({ query, language, searchFor }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["show_search_results", language, query, searchFor],
    queryFn: searchShow,
    staleTime: 1000 * 60 * 60,
  });
  return (
    <ShowSection
      showArray={data}
      error={error}
      loading={isLoading}
      isTv={searchFor === "tv"}
    />
  );
}
