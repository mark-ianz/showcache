import { getImg } from "@/lib/helpers";
import { MovieFullDetails } from "@/types/movie.details";
import { Video } from "@/types/video";
import Rating from "../Rating";
import ViewInfoSectionWrapper from "./ViewInfoSectionWrapper";
import JoinGenreList from "./JoinGenreList";
import ShowNameWYear from "./ShowNameWYear";
import OtherShowDescription from "./OtherShowDescription";
import OptionButtons from "./OptionButtons";

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
      {poster_path && (
        <img
          src={poster_path}
          alt={movieFullDetails.title + " poster path"}
          className="object-cover rounded-lg"
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 font-thin items-center">
          <p className="min-w-fit">
            {movieFullDetails?.runtime
              ? `${movieFullDetails.runtime} min`
              : "N/A"}
          </p>
          <JoinGenreList genreList={genreList} />
          <Rating rating={movieFullDetails.vote_average} />
        </div>
        <ShowNameWYear showName={movieFullDetails.title} year={year} />
        <OtherShowDescription
          directorList={directorList}
          tagline={movieFullDetails.tagline}
          overview={movieFullDetails.overview}
        />
        <OptionButtons
          officialTrailer={officialTrailer}
          showName={movieFullDetails.title}
        />
      </div>
    </ViewInfoSectionWrapper>
  );
}
