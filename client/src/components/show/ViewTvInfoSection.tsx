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
  const tagline = showData?.tagline;

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
              {showData?.seasons ? `${showData.seasons.length} seasons` : "N/A"}{" "}
            </p>
            <p>{genreList?.join(" / ")}</p>
            <Rating rating={showData.vote_average} />
          </div>
          <div className="flex gap-4 items-center text-4xl">
            <p className="font-bold">{showData?.name}</p>
            <p>({year})</p>
          </div>
          <div className="flex flex-col gap-2">
            {tagline && (
              <p className="text-muted-foreground italic">{tagline}</p>
            )}
            <div>
              <p className="text-xl font-bold">Overview</p>
              <p>{showData?.overview}</p>
            </div>
            <p className="text-muted-foreground">
              Directed by {directorList?.join(", ")}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              size={"icon"}
              className="rounded-full"
              variant={"secondary"}
            >
              <HeartIcon className="w-5 h-5" />
            </Button>
            <Button
              size={"icon"}
              className="rounded-full"
              variant={"secondary"}
            >
              <BookmarkIcon className="w-5 h-5" />
            </Button>
            <TrailerDialog
              officialTrailer={officialTrailer}
              showName={showData.name}
            />
          </div>
        </div>
      </div>
    </ViewInfoSectionWrapper>
  );
}
