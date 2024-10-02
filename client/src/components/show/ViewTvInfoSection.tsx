import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImg } from "@/lib/helpers";
import { Video } from "@/types/video";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { HeartIcon, Play } from "lucide-react";
import Rating from "../Rating";
import { TvFullDetails } from "@/types/tv";
import ViewInfoSectionWrapper from "./ViewInfoSectionWrapper";
import TrailerDialog from "./TrailerDialog";
import JoinGenreList from "./JoinGenreList";
import ShowNameWYear from "./ShowNameWYear";
import OtherShowDescription from "./OtherShowDescription";
import OptionButtons from "./OptionButtons";

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
      <div className="flex gap-10 relative z-10 items-center">
        {poster_path && (
          <img
            src={poster_path}
            alt={showData.name + " poster path"}
            className="object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-thin">
            <p>
              {showData?.seasons ? `${showData.seasons.length} seasons` : "N/A"}
            </p>
            <JoinGenreList genreList={genreList} />
            <Rating rating={showData.vote_average} />
          </div>
          <ShowNameWYear showName={showData.name} year={year} />
          <OtherShowDescription
            directorList={directorList}
            tagline={showData.tagline}
            overview={showData.overview}
          />
          <OptionButtons
            officialTrailer={officialTrailer}
            showName={showData.name}
          />
        </div>
      </div>
    </ViewInfoSectionWrapper>
  );
}
