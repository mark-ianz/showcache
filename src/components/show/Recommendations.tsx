import { getRecommendations } from "@/api/show.service";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import ScrollableSection from "../ScrollableSection";
import { cn } from "@/lib/utils";
import ShowCard from "./ShowCard";
import { useLocation } from "react-router-dom";
import { getShowName, getShowTypeFromUseLocation } from "@/lib/helpers";

import { Skeleton } from "../ui/skeleton";
import ShowCardSkeleton from "./ShowCardSkeleton";

export default function Recommendations({ id }: { id: string }) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const type = getShowTypeFromUseLocation(useLocation());

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["tv_recommendations", type, language, id],
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-48 flex-shrink-0">
            <ShowCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );


  return (
    recommendations && recommendations.length > 0 && (
      <ScrollableSection title="Recommendations">
        {recommendations.map((show, index) => (
          <li
            className={cn(
              "w-48 max-lg:w-40 max-md:w-36 max-sm:w-32",
              index + 1 === recommendations?.length && "z-10"
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
