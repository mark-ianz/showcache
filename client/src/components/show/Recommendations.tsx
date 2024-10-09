import { getTvRecommendations } from "@/api/show.service";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import ScrollableSection from "../ScrollableSection";
import { cn } from "@/lib/utils";
import ShowCard from "./ShowCard";

export default function Recommendations({ id }: { id: string }) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { data: recommendations } = useQuery({
    queryKey: ["tv_recommendations", language, id],
    queryFn: getTvRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (!recommendations) return <p>loading</p>;

  return (
    recommendations.length > 0 && (
      <ScrollableSection title="Recommendations">
        {recommendations.map((tv, index) => (
          <li
            className={cn(
              "min-w-48",
              index + 1 === recommendations.length && "z-10"
            )}
            key={tv.id}
          >
            <ShowCard
              path={"/tv/" + tv.id}
              genre_ids={tv.genre_ids}
              vote_average={tv.vote_average}
              name={tv.name}
              image_path={tv.poster_path}
            />
          </li>
        ))}
      </ScrollableSection>
    )
  );
}
