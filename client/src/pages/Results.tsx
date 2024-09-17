import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getTopRated } from "@/lib/api";
import { LoaderIcon } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

export default function Results() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { data, error, isError, isLoading } = useShows({
    queryKey: ["results", language, search],
    queryFn: getTopRated,
  });

  if (!data || isLoading) {
    return <LoaderIcon />;
  }

  return (
    <ListMainWrapper>
      <ShowSection showArray={data} title="Top Rated" />
    </ListMainWrapper>
  );
}
