import { useLanguage } from "@/components/context/language-provider";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getTopRated } from "@/lib/api";

export default function TopRated() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isError, isLoading } = useShows({
    queryKey: ["top_rated", language],
    queryFn: getTopRated,
  });

  if (!data) {
    return <p>asdas</p>;
  }

  return (
    <main className="flex flex-col gap-20 max-w-screen-2xl">
      <ShowSection showArray={data} title="Top Rated" />
    </main>
  );
}
