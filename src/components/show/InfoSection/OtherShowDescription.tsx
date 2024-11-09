import { useLanguage } from "@/context/language-provider";
import { getShowDirectors } from "@/lib/helpers";
import { ShowFullDetails } from "@/types/show";
import { useEffect, useState } from "react";
import Overview from "./Overview";

type Props = {
  showData: ShowFullDetails;
};

export default function OtherShowDescription({ showData }: Props) {
  const [directors, setDirectors] = useState<string[] | []>([]);
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  useEffect(() => {
    const fetchDirectors = async () => {
      const directorsData = await getShowDirectors(showData);
      setDirectors(directorsData);
    };

    fetchDirectors();
  }, [showData, language]);
  return (
    <div className="flex flex-col gap-2 max-md:text-sm">
      {showData.tagline && (
        <p className="text-muted-foreground italic">{showData.tagline}</p>
      )}
      <Overview overview={showData.overview}/>
      {directors.length > 0 && (
        <p className="text-muted-foreground">
          Directed by {directors.join(", ")}
        </p>
      )}
    </div>
  );
}
