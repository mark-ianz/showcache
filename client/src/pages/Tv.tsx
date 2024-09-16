import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowListWrapper from "@/components/show/ShowListWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getTv } from "@/lib/api";
import { LoaderIcon } from "lucide-react";

export default function Tv() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isError, isLoading } = useShows({
    queryKey: ["tv", language],
    queryFn: getTv,
  });

  if (!data || isLoading) {
    return <LoaderIcon />;
  }

  return (
    <ListMainWrapper>
      <ShowSection showArray={data} title="Top Rated" isTv />
    </ListMainWrapper>
  );
}
