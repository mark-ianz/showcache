import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Video } from "@/lib/api";
import { getImg } from "@/lib/constants";
import { MovieFullDetails } from "@/pages/LandingPage";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { HeartIcon, Play } from "lucide-react";

type ViewShowInfoSectionProps = {
  showData: MovieFullDetails;
  genreList: string[];
  directorList: string[];
  year: number;
  officialTrailer: Video;
};

const ViewShowInfoSection = ({
  showData,
  genreList,
  directorList,
  year,
  officialTrailer,
}: ViewShowInfoSectionProps) => {
  return (
    <section
      className="p-6"
      style={{
        backgroundImage: `url(${getImg(showData?.backdrop_path!, "w1280")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>

      <div className="flex gap-10 relative z-10 items-center">
        <img
          src={getImg(showData?.poster_path!, "w300")}
          alt={showData?.title + "backdrop"}
          className="object-cover rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-thin">
            <p>{showData?.runtime} min</p>
            <p>{genreList?.join(" / ")}</p>
          </div>
          <div className="flex gap-4 items-center text-4xl">
            <p className="font-bold">{showData?.title}</p>
            <p className="">({year})</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground italic">{`"${showData?.tagline}"`}</p>
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
              <DialogContent className="max-w-screen-lg p-0 border-none bg-none">
                {officialTrailer && (
                  <div className="aspect-video relative">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewShowInfoSection;
