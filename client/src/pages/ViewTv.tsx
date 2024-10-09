import ScrollableSection from "@/components/ScrollableSection";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTvRecommendations } from "@/api/show.service";
import MediaTabs from "@/components/MediaTabs";
import ShowCard from "@/components/show/ShowCard";
import { getTvFullDetails } from "@/api/tv.service";
import Seasons from "@/components/Seasons";
import { cn } from "@/lib/utils";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";
import Casts from "@/components/show/Casts";

export default function ViewTv() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getTvFullDetails,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["tv_recommendations", language, id],
    queryFn: getTvRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (!data || !recommendations) return <p>loading</p>;

  return (
    <>
      <main className="w-full relative flex flex-col gap-10">
        <ViewInfoSection showData={data} />
        <Casts type="tv" id={id!} />
        <Seasons seasons={data.seasons} />
        <MediaTabs showData={data} />

        {recommendations.length > 0 && (
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
        )}
      </main>
    </>
  );
}
