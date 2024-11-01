import { getShowName, getShowYear } from "@/lib/helpers";
import { ShowFullDetails } from "@/types/show";

type Props = { showData: ShowFullDetails };

export default function ShowNameWYear({ showData }: Props) {
  const showName = getShowName(showData);
  const year = getShowYear(showData);

  return (
    <div className="flex gap-4 items-center">
      <p className="font-bold text-3xl max-md:text-2xl max-sm:text-xl">
        {showName}
      </p>
      <p className="text-2xl max-md:text-xl max-sm:text-lg">
        ({year || "N/A"})
      </p>
    </div>
  );
}
