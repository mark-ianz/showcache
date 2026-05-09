import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getPopularMovies } from "@/api/movies.service";

export default function Movies() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading } = useShows({
    queryKey: ["popular_movies", language],
    queryFn: getPopularMovies,
  });

  return (
    <ListMainWrapper>
      <ShowSection
        error={error}
        loading={isLoading}
        showArray={data}
        title="Movies"
        subtitle="Explore all available films"
      />
    </ListMainWrapper>
  );
}
