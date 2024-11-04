import { BelongsToCollection as BelongsToCollectionType } from "@/types/movie.details";
import HeaderText from "../HeaderText";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { getCollectionDetails } from "@/api/movies.service";
import { getImg } from "@/lib/helpers";
import LoadingAnimation from "../LoadingAnimation";
import { Button } from "../ui/button";

type Props = { belongs_to_collection: BelongsToCollectionType };

export default function BelongsToCollection({ belongs_to_collection }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const {
    data: collection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection_details", language, belongs_to_collection.id],
    queryFn: getCollectionDetails,
    staleTime: 1000 * 60 * 5,
  });

  if (error || (!isLoading && !collection)) return null;
  if (isLoading) return <LoadingAnimation />;

  const moviesIncluded = collection?.parts.map((movie, index) => {
    if (index + 1 === collection.parts.length) {
      return " and " + movie.title;
    }
    return movie.title + ", ";
  });
  console.log(belongs_to_collection);
  console.log(collection);

  return (
    belongs_to_collection && (
      <div
        className="w-full relative rounded-md p-14 max-xl:p-10 max-lg:p-8 max-md:p-6 max-xsm:p-4"
        style={{
          backgroundImage: `url(${getImg({
            path: belongs_to_collection.backdrop_path,
            size: "w780",
            mediaType: "show",
          })})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="inset-0 bg-tertiary absolute opacity-60 rounded-md"></span>
        <div className="text-white z-10 relative flex flex-col justify-center h-full">
          <HeaderText className="font-bold text-3xl max-md:text-2xl max-sm:text-lg max-xsm:text-md">
            {`Belongs to the ${belongs_to_collection?.name}`}
          </HeaderText>
          <p className="max-sm:text-sm">
            Collection contains of {moviesIncluded}
          </p>
          <Button className="w-fit mt-4 max-sm:text-xs max-sm:p-2">
            View Collection
          </Button>
        </div>
      </div>
    )
  );
}
