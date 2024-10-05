import { getImg } from "@/lib/helpers";
import { Video } from "@/types/video";
import { TvFullDetails } from "@/types/tv";
import ViewInfoSectionWrapper from "./ViewInfoSectionWrapper";
import ViewInfoSectionContent from "./ViewInfoSectionContent";

type ViewTvInfoSectionProps = {
  showData: TvFullDetails;
  genreList: string[];
  directorList: string[];
  year: number;
  officialTrailer: Video | undefined;
};

export default function ViewTvInfoSection({
  showData,
  genreList,
  directorList,
  year,
  officialTrailer,
}: ViewTvInfoSectionProps) {
  const backdrop_path = getImg(showData?.backdrop_path!, "w1280", true);
  const poster_path = getImg(showData?.poster_path!, "w300", true);

  return (
    <ViewInfoSectionWrapper backdrop_path={backdrop_path}>
      <ViewInfoSectionContent
        directorList={directorList}
        genreList={genreList}
        officialTrailer={officialTrailer}
        poster_path={poster_path!}
        showData={showData}
        year={year}
      />
    </ViewInfoSectionWrapper>
  );
}
