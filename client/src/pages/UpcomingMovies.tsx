import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getUpcomingMovies } from "@/lib/api";
import { LoaderIcon } from "lucide-react";

export default function UpcomingMovies() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isError, isLoading } = useShows({
    queryKey: ["upcoming_movies", language],
    queryFn: getUpcomingMovies,
  });

  console.log(data);

  if (!data || isLoading) {
    return <LoaderIcon />;
  }

  return (
    <ListMainWrapper>
      <ShowSection showArray={data} title="Upcoming Movies" />
    </ListMainWrapper>
  );
}
