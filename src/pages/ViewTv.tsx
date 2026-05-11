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
import ShowDetailSkeleton from "@/components/show/ShowDetailSkeleton";
import ErrorComponent from "@/components/ErrorComponent";
import ShowDetails from "@/components/show/ShowDetails";

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

  if (isLoading) return <ShowDetailSkeleton />;

  if (error) return <ErrorComponent error={error} />;

  return (
    data && (
      <div className="flex w-full flex-col gap-10">
        <ViewInfoSection showData={data} />
        <div className="flex gap-14 max-md:flex-col max-md:gap-5">
          <ViewShowLayout className="overflow-hidden">
            <Casts type="tv" id={id!} />
            <Seasons seasons={data.seasons} />
            <ShowMedia show_data={data} show_title={data.name} />
            <Recommendations id={id!} />
          </ViewShowLayout>

          <div className="w-60 max-md:w-full">
            <ShowDetails showData={data} />
          </div>
        </div>
      </div>
    )
  );
}
