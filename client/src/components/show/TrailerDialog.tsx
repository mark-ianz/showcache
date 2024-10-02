import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { Video } from "@/types/video";

type Props = { officialTrailer: Video | undefined; showName: string };

export default function TrailerDialog({ officialTrailer, showName }: Props) {
  return (
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
              {showName} Trailer
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
