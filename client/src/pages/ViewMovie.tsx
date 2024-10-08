import ScrollableItem from "@/components/ScrollableItem";
import ScrollableSection from "@/components/ScrollableSection";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieFullDetails } from "@/api/movies.service";
import { getCredits } from "@/api/credits.service";
import { getMovieRecommendations, getTrailers } from "@/api/show.service";
import { Cast, Crew } from "@/types/credits";
import MediaTabs from "@/components/MediaTabs";
import { Movie } from "@/types/show";
import ShowCard from "@/components/show/ShowCard";
import { cn } from "@/lib/utils";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";

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

  const { data: trailers } = useQuery({
    queryKey: ["trailers", "movie", language, id],
    queryFn: getTrailers,
    staleTime: 1000 * 60 * 5,
  });

  const { data: credits } = useQuery({
    queryKey: ["credits", "movie", language, id],
    queryFn: getCredits,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["movie_recommendations", language, id],
    queryFn: getMovieRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (!data || !credits || !trailers || !recommendations) return <p>loading</p>;

  const scrollItems: (Cast | Crew)[] =
    credits.cast.length > 14
      ? credits.cast.slice(0, 14)
      : [...credits.cast, ...credits.crew.slice(0, 14 - credits.cast.length)];

  return (
    <>
      <main className="w-full relative flex flex-col gap-10">
        <ViewInfoSection showData={data} />

        <ScrollableSection title="Cast">
          {scrollItems.map((credit: Cast | Crew, index: number) => (
            <ScrollableItem
              path={"/person/" + credits.id}
              lastItem={index + 1 === scrollItems.length}
              key={`${credit.id}-${
                "character" in credit ? credit.character : credit.job
              }-${index}`}
              image_path={credit.profile_path}
              title={credit.name}
              subtext={"character" in credit ? credit.character : credit.job} // Type narrowing
            />
          ))}
        </ScrollableSection>

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

{
  /* <ScrollableItem
  path={"/movie/" + movie.id}
  lastItem={index + 1 === recommendations.length}
  key={movie.id}
  image_path={movie.poster_path}
  title={movie.title}
/> */
}
