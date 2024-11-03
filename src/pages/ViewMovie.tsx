import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieFullDetails } from "@/api/movies.service";
import ViewInfoSection from "@/components/show/InfoSection/ViewInfoSection";
import Casts from "@/components/show/Casts";
import Recommendations from "@/components/show/Recommendations";
import ViewShowLayout from "@/components/show/ViewShowLayout";
import ShowMedia from "@/components/show/ShowMedia";
import LoadingAnimation from "@/components/LoadingAnimation";
import ShowDetails from "@/components/show/ShowDetails";

export default function ViewMovie() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, isLoading, error } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getMovieFullDetails,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p>There was a server error. Please try again later.</p>;
  console.log(data);
  return (
    data && (
      <div className="flex w-full flex-col gap-10">
        <ViewInfoSection showData={data} />
        <div className="flex gap-14 max-md:flex-col">
          <ViewShowLayout className="overflow-hidden">
            <Casts id={id!} type="movie" />
            <ShowMedia show_data={data} />
            <Recommendations id={id!} />
          </ViewShowLayout>

          <div className="w-60">
            <ShowDetails showData={data}/>
          </div>
        </div>
      </div>
    )
  );
}
