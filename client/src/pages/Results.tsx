import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { useSearchParams } from "react-router-dom";
import { getSearchResult } from "@/api/show.service";

export default function Results() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const searchFor = searchParams.get("searchFor");

  const { data, error, isLoading } = useShows({
    queryKey: ["results", language, query, searchFor],
    queryFn: getSearchResult,
  });

  return (
    <ListMainWrapper>
      <ShowSection
        showArray={data}
        error={error}
        loading={isLoading}
        title="Top Rated"
        isTv={searchFor === "tv"}
      />
    </ListMainWrapper>
  );
}
