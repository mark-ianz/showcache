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
    <section
      className="p-6"
      style={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>

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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className="gap-1"
                  disabled={!officialTrailer}
                >
                  {officialTrailer ? (
                    <>
                      <Play className="w-5 h-5" />
                      <p> Play Trailer</p>
                    </>
                  ) : (
                    "No Available Trailer"
                  )}
                </Button>
              </DialogTrigger>
              {officialTrailer && (
                <DialogContent
                  className="max-w-screen-lg p-0 pt-4 border-none bg-black"
                  aria-describedby={undefined}
                >
                  <div className="flex items-center">
                    <DialogTitle className="pl-4 text-white">
                      {showData.name} Trailer
                    </DialogTitle>
                    <DialogClose color="#ffffff" />
                  </div>
                  <div className="aspect-video relative">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
