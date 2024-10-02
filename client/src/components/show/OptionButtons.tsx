import { Button } from "../ui/button";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import TrailerDialog from "./TrailerDialog";
import { Video } from "@/types/video";

type Props = { officialTrailer: Video | undefined; showName: string };

export default function OptionButtons({ officialTrailer, showName }: Props) {
  return (
    <div className="flex gap-4">
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <HeartIcon className="w-5 h-5" />
      </Button>
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <BookmarkIcon className="w-5 h-5" />
      </Button>
      <TrailerDialog officialTrailer={officialTrailer} showName={showName} />
    </div>
  );
}
