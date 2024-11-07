import { getImg, getShowDuration } from "@/lib/helpers";
import JoinGenreList from "./JoinGenreList";
import Rating from "@/components/Rating";
import ShowNameWYear from "../ShowNameWYear";
import OtherShowDescription from "./OtherShowDescription";
import OptionButtons from "./OptionButtons";
import ShowPoster from "./ShowPoster";
import { ShowFullDetails } from "@/types/show";
import ViewImage from "@/components/ViewImage";

type Props = {
  showData: ShowFullDetails;
};

export default function ViewInfoSection({ showData }: Props) {
  const backdrop_path = getImg({
    path: showData.backdrop_path,
    size: "original",
    mediaType: "show",
    undefineable: true,
  });

  return (
    <section
      className="p-6 relative"
      style={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
      <div className="relative z-10 items-center">
        <div className="flex gap-10 max-md:flex-col items-center">
          <ViewImage src={showData.poster_path} mediaType="show">
            <ShowPoster showData={showData} />
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
    </section>
  );
}
