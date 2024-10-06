import { getImg } from "@/lib/helpers";
import { MovieFullDetails } from "@/types/movie.details";
import { Video } from "@/types/video";
import ViewInfoSectionWrapper from "./ViewInfoSectionWrapper";
import ViewInfoSectionContent from "./ViewInfoSectionContent";

type ViewShowInfoSectionProps = {
  movieFullDetails: MovieFullDetails;
  genreList: string[];
  directorList: string[];
  year: number;
  officialTrailer: Video | undefined;
};

export default function ViewMovieInfoSection({
  movieFullDetails,
  genreList,
  directorList,
  year,
  officialTrailer,
}: ViewShowInfoSectionProps) {
  const backdrop_path = getImg(movieFullDetails?.backdrop_path!, "w1280", true);
  const poster_path = getImg(movieFullDetails?.poster_path!, "w300", true);
  return (
    <ViewInfoSectionWrapper backdrop_path={backdrop_path}>
      <ViewInfoSectionContent
        directorList={directorList}
        genreList={genreList}
        officialTrailer={officialTrailer}
        poster_path={poster_path}
        showData={movieFullDetails}
        year={year}
      />
    </ViewInfoSectionWrapper>
  );
}
