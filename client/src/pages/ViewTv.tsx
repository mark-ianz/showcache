import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTvRecommendations } from "@/api/show.service";
import MediaTabs from "@/components/MediaTabs";
import { getTvFullDetails } from "@/api/tv.service";
import Seasons from "@/components/Seasons";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";
import Casts from "@/components/show/Casts";
import Recommendations from "@/components/show/Recommendations";

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
        <Recommendations id={id!} />
      </main>
    </>
  );
}
