import { getShowType } from "@/lib/helpers";
import AccountActions from "../AccountActions";
import TrailerDialog from "./TrailerDialog";
import { ShowFullDetails } from "@/types/show";

type Props = { showData: ShowFullDetails };

export default function OptionButtons({ showData }: Props) {
  const mediaType = getShowType(showData);

  return (
    <div className="flex gap-4 items-center">
      <AccountActions 
        mediaType={mediaType as "movie" | "tv"} 
        mediaId={showData.id} 
      />
      <TrailerDialog showData={showData} />
    </div>
  );
}
