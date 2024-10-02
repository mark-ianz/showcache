import { Button } from "@/components/ui/button";
import { getImg } from "@/lib/helpers";
import { MovieFullDetails } from "@/types/movie.details";
import { Video } from "@/types/video";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { HeartIcon } from "lucide-react";
import Rating from "../Rating";
import ViewInfoSectionWrapper from "./ViewInfoSectionWrapper";
import TrailerDialog from "./TrailerDialog";

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
  const tagline = movieFullDetails?.tagline;

  return (
    <ViewInfoSectionWrapper backdrop_path={backdrop_path}>
      <div className="flex gap-10 relative z-10 items-center">
        {poster_path && (
          <img
            src={poster_path}
            alt={movieFullDetails.title + " poster path"}
            className="object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-thin">
            <p>{movieFullDetails?.runtime ? `${movieFullDetails.runtime} min` : "N/A"} </p>
            <p>{genreList?.join(" / ")}</p>
            <Rating rating={movieFullDetails.vote_average} />
          </div>
          <div className="flex gap-4 items-center text-4xl">
            <p className="font-bold">{movieFullDetails?.title}</p>
            <p>({year})</p>
          </div>
          <div className="flex flex-col gap-2">
            {tagline && (
              <p className="text-muted-foreground italic">{tagline}</p>
            )}
            <div>
              <p className="text-xl font-bold">Overview</p>
              <p>{movieFullDetails?.overview}</p>
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
            <TrailerDialog officialTrailer={officialTrailer} showName={movieFullDetails.title}/>
          </div>
        </div>
      </div>
    </ViewInfoSectionWrapper>
  );
}
