import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieFullDetails } from "@/api/movies.service";
import MediaTabs from "@/components/MediaTabs";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";
import Casts from "@/components/show/Casts";
import Recommendations from "@/components/show/Recommendations";
import ViewShowLayout from "@/components/show/ViewShowLayout";

export default function ViewMovie() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getMovieFullDetails,
    staleTime: 1000 * 60 * 5,
  });

  if (!data) return <p>loading</p>;

  return (
    <ViewShowLayout>
      <ViewInfoSection showData={data} />
      <Casts id={id!} type="movie" />
      <MediaTabs showData={data} />
      <Recommendations id={id!} />
    </ViewShowLayout>
  );
}
