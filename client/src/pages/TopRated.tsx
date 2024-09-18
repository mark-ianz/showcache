import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getTopRated } from "@/lib/api";

export default function TopRated() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading } = useShows({
    queryKey: ["top_rated", language],
    queryFn: getTopRated,
  });

  return (
    <ListMainWrapper>
      <ShowSection
        showArray={data}
        error={error}
        loading={isLoading}
        title="Top Rated"
      />
    </ListMainWrapper>
  );
}
