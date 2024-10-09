import ScrollableSection from "@/components/ScrollableSection";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieFullDetails } from "@/api/movies.service";
import { getMovieRecommendations } from "@/api/show.service";
import MediaTabs from "@/components/MediaTabs";
import { Movie } from "@/types/show";
import ShowCard from "@/components/show/ShowCard";
import { cn } from "@/lib/utils";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";
import Casts from "@/components/show/Casts";

export default function ViewMovie() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getMovieFullDetails,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["movie_recommendations", language, id],
    queryFn: getMovieRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (!data || !recommendations) return <p>loading</p>;

  return (
    <>
      <main className="w-full relative flex flex-col gap-10">
        <ViewInfoSection showData={data} />
        <Casts id={id!} type="movie" />
        <MediaTabs showData={data} />

        {recommendations.length > 0 && (
          <ScrollableSection title="Recommendations">
            {recommendations.map((movie: Movie, index: number) => (
              <li
                className={cn(
                  "min-w-48",
                  index + 1 === recommendations.length && "z-10"
                )}
                key={movie.id}
              >
                <ShowCard
                  path={"/movie/" + movie.id}
                  genre_ids={movie.genre_ids}
                  vote_average={movie.vote_average}
                  name={movie.title}
                  image_path={movie.poster_path}
                />
              </li>
            ))}
          </ScrollableSection>
        )}
      </main>
    </>
  );
}
