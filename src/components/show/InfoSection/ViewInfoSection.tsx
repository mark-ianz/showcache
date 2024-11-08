import { getShowDuration } from "@/lib/helpers";
import JoinGenreList from "./JoinGenreList";
import Rating from "@/components/Rating";
import ShowNameWYear from "../ShowNameWYear";
import OtherShowDescription from "./OtherShowDescription";
import OptionButtons from "./OptionButtons";
import ShowPoster from "./ShowPoster";
import { ShowFullDetails } from "@/types/show";
import ViewImage from "@/components/ViewImage";
import SectionwBGImage from "../SectionwBGImage";

type Props = {
  showData: ShowFullDetails;
};

export default function ViewInfoSection({ showData }: Props) {
  return (
    <SectionwBGImage backdrop_path={showData.backdrop_path}>
      {/* Overlay */}
      <div className="relative z-10 items-center">
        <div className="flex gap-10 max-md:flex-col items-center">
          <ViewImage src={showData.poster_path} mediaType="show">
            <ShowPoster poster_path={showData.poster_path} />
          </ViewImage>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 font-thin items-center max-md:text-sm max-sm:text-xs">
              <p className="min-w-fit">{getShowDuration(showData)}</p>
              <JoinGenreList showData={showData} />
              <Rating rating={showData.vote_average} />
            </div>
            <ShowNameWYear showData={showData} />
            <OtherShowDescription showData={showData} />
            <OptionButtons showData={showData} />
          </div>
        </div>
      </div>
    </SectionwBGImage>
  );
}
