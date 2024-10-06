import { Button } from "../../ui/button";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import TrailerDialog from "./TrailerDialog";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";

type Props = { showData: TvFullDetails | MovieFullDetails };

export default function OptionButtons({ showData }: Props) {
  return (
    <div className="flex gap-4">
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <HeartIcon className="w-5 h-5" />
      </Button>
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <BookmarkIcon className="w-5 h-5" />
      </Button>
      <TrailerDialog showData={showData} />
    </div>
  );
}
