import { Button } from "../../ui/button";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import TrailerDialog from "./TrailerDialog";
import { ShowFullDetails } from "@/types/show";

type Props = { showData: ShowFullDetails };

export default function OptionButtons({ showData }: Props) {
  return (
    <div className="flex gap-4">
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <HeartIcon className="w-4 h-4" />
      </Button>
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <BookmarkIcon className="w-4 h-4" />
      </Button>
      <TrailerDialog showData={showData} />
    </div>
  );
}
