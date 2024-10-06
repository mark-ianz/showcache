import JoinGenreList from "./JoinGenreList";
import Rating from "@/components/Rating";
import ShowNameWYear from "../ShowNameWYear";
import OtherShowDescription from "./OtherShowDescription";
import OptionButtons from "./OptionButtons";
import { Video } from "@/types/video";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";
import { getShowDuration, getShowName } from "@/lib/helpers";

type Props = {
  showData: TvFullDetails | MovieFullDetails;
  genreList: string[];
  directorList: string[];
  year: number;
  officialTrailer: Video | undefined;
  poster_path: string | undefined;
};

export default function ViewInfoSectionContent({
  poster_path,
  showData,
  genreList,
  year,
  directorList,
  officialTrailer,
}: Props) {
  return (
    <>
      {poster_path && (
        <img
          src={poster_path}
          alt={getShowName(showData) + " poster path"}
          className="object-cover rounded-lg"
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 font-thin items-center">
          <p className="min-w-fit">{getShowDuration(showData)}</p>
          <JoinGenreList genreList={genreList} />
          <Rating rating={showData.vote_average} />
        </div>
        <ShowNameWYear showName={getShowName(showData)} year={year} />
        <OtherShowDescription
          directorList={directorList}
          tagline={showData.tagline}
          overview={showData.overview}
        />
        <OptionButtons
          officialTrailer={officialTrailer}
          showName={getShowName(showData)}
        />
      </div>
    </>
  );
}
