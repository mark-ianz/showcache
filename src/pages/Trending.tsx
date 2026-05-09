import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getTrendingThisWeek } from "@/api/movies.service";

export default function Trending() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading } = useShows({
    queryKey: ["trending_movies", language],
    queryFn: getTrendingThisWeek,
  });

  return (
    <ListMainWrapper>
      <ShowSection
        error={error}
        loading={isLoading}
        showArray={data}
        title="Trending Now"
        subtitle="Most viewed titles in the last 24 hours"
      />
    </ListMainWrapper>
  );
}
