import { getImg, getShowName } from "@/lib/helpers";
import { MovieFullDetails } from "@/types/movie.details";
import { TvFullDetails } from "@/types/tv";

type Props = { showData: TvFullDetails | MovieFullDetails };

export default function ShowPoster({ showData }: Props) {
  const poster_path = getImg(showData?.poster_path!, "w780", true);

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
