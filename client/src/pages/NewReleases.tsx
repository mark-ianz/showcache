import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getNewReleases } from "@/lib/api";

export default function NewReleases() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading } = useShows({
    queryKey: ["new_releases", language],
    queryFn: getNewReleases,
  });

  return (
    <ListMainWrapper>
      <ShowSection
        showArray={data}
        error={error}
        loading={isLoading}
        title="New Releases"
      />
    </ListMainWrapper>
  );
}
