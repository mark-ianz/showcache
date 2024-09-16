import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getNewReleases } from "@/lib/api";
import { LoaderIcon } from "lucide-react";

export default function NewReleases() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isError, isLoading } = useShows({
    queryKey: ["new_releases", language],
    queryFn: getNewReleases,
  });

  if (!data || isLoading) {
    return <LoaderIcon />;
  }

  return (
    <ListMainWrapper>
      <ShowSection showArray={data} title="New Releases" />
    </ListMainWrapper>
  );
}
