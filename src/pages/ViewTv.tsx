import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTvFullDetails } from "@/api/tv.service";
import Seasons from "@/components/Seasons";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";
import Casts from "@/components/show/Casts";
import Recommendations from "@/components/show/Recommendations";
import ViewShowLayout from "@/components/show/ViewShowLayout";
import ShowMedia from "@/components/show/ShowMedia";
import LoadingAnimation from "@/components/LoadingAnimation";
import ErrorComponent from "@/components/ErrorComponent";

export default function ViewTv() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, isLoading, error } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getTvFullDetails,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorComponent error={error}/>;

  return (
    data && (
      <ViewShowLayout>
        <ViewInfoSection showData={data} />
        <Casts type="tv" id={id!} />
        <Seasons seasons={data.seasons} />
        <ShowMedia show_data={data} />
        <Recommendations id={id!} />
      </ViewShowLayout>
    )
  );
}
