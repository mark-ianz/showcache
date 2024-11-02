import { getImg, getShowName } from "@/lib/helpers";
import { ShowFullDetails } from "@/types/show";

type Props = { showData: ShowFullDetails };

export default function ShowPoster({ showData }: Props) {
  const poster_path = getImg({path: showData.poster_path, size: "w780", mediaType: "show"});

  return (
    <div className="w-72 max-xsm:w-56">
      {poster_path && (
        <img
          src={poster_path}
          alt={getShowName(showData) + " poster path"}
          className="object-cover rounded-lg min-w-60 max-md:min-w-0"
        />
      )}
    </div>
  );
}
