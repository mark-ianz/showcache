import { getRecommendations } from "@/api/show.service";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import ScrollableSection from "../ScrollableSection";
import { cn } from "@/lib/utils";
import ShowCard from "./ShowCard";
import { useLocation } from "react-router-dom";
import { getShowName, getShowTypeFromUseLocation } from "@/lib/helpers";

export default function Recommendations({ id }: { id: string }) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const type = getShowTypeFromUseLocation(useLocation());

  const { data: recommendations } = useQuery({
    queryKey: ["tv_recommendations", type, language, id],
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (!recommendations) return <p>loading</p>;

  return (
    recommendations.length > 0 && (
      <ScrollableSection title="Recommendations">
        {recommendations.map((show, index) => (
          <li
            className={cn(
              "w-48 max-lg:w-40 max-md:w-36 max-sm:w-32",
              index + 1 === recommendations.length && "z-10"
            )}
            key={show.id}
          >
            <ShowCard
              path={`/${type}/` + show.id}
              genre_ids={show.genre_ids}
              vote_average={show.vote_average}
              name={getShowName(show)}
              image_path={show.poster_path}
            />
          </li>
        ))}
      </ScrollableSection>
    )
  );
}
