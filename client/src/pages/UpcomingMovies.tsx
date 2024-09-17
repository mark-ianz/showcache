import { useLanguage } from "@/components/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getUpcomingMovies } from "@/lib/api";

export default function UpcomingMovies() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading } = useShows({
    queryKey: ["upcoming_movies", language],
    queryFn: getUpcomingMovies,
  });

  return (
    <ListMainWrapper>
      <ShowSection
        showArray={data}
        error={error}
        loading={isLoading}
        title="Upcoming Movies"
      />
    </ListMainWrapper>
  );
}
