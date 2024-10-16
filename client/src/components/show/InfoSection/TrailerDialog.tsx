import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Play } from "lucide-react";
import { Video } from "@/types/video";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/language-provider";
import { getTrailers } from "@/api/show.service";
import { getShowName } from "@/lib/helpers";

type Props = { showData: TvFullDetails | MovieFullDetails };

export default function TrailerDialog({ showData }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const type = "title" in showData ? "movie" : "tv";
  const [officialTrailer, setOfficialTrailer] = useState<Video | undefined>(
    undefined
  );

  const { data: trailers, isLoading } = useQuery({
    queryKey: ["trailers", type, language, showData.id],
    queryFn: getTrailers,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setOfficialTrailer(
      trailers?.find((trailer) => trailer.name === "Official Trailer") ||
        trailers?.find((trailer) => trailer.name === "Final Trailer") ||
        trailers?.[0]
    );
  }, [trailers]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="gap-1" disabled={isLoading}>
          {officialTrailer ? (
            <>
              <Play className="w-4 h-4" />
              <p className="max-md:text-sm max-sm:text-xs">Play Trailer</p>
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
              {getShowName(showData)} Trailer
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
  );
}
