import { BelongsToCollection as BelongsToCollectionType } from "@/types/movie.details";
import HeaderText from "../HeaderText";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { getCollectionDetails } from "@/api/movies.service";
import { getImg } from "@/lib/helpers";

type Props = { belongs_to_collection: BelongsToCollectionType };

export default function BelongsToCollection({ belongs_to_collection }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  /* const { data: collection } = useQuery({
    queryKey: ["collection_details", language, belongs_to_collection.id],
    queryFn: getCollectionDetails,
    staleTime: 1000 * 60 * 5,
  }); */

  console.log(belongs_to_collection);

  return (
    belongs_to_collection && (
      <div>
        <HeaderText>
          {`Belongs to the ${belongs_to_collection?.name}`}
        </HeaderText>
        <div>
          <img
            src={getImg({
              path: belongs_to_collection.backdrop_path,
              size: "w300",
              mediaType: "show",
            })}
          />
        </div>
      </div>
    )
  );
}
