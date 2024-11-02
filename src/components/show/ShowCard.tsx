import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { useId } from "react";
import Rating from "../Rating";
import { AspectRatio } from "../ui/aspect-ratio";
import { getGenre, getImg } from "@/lib/helpers";
import { Link } from "react-router-dom";

type ShowCardProps = {
  name: string;
  image_path: string;
  vote_average: number;
  genre_ids: number[];
  path: string;
};

export default function ShowCard({
  name,
  image_path,
  vote_average,
  genre_ids,
  path,
}: ShowCardProps) {
  const genre_list = getGenre(genre_ids);

  return (
    <Link to={path}>
      <Card className="cursor-pointer w-full h-full flex flex-col">
        <AspectRatio ratio={2 / 3}>
          <img
            src={getImg({path: image_path, size: "w780", mediaType: "show"})}
            alt={`Poster image of ${name}`}
            className="w-full h-full object-cover rounded-t-xl object-center"
            loading="lazy"
          />
        </AspectRatio>
        <CardContent className="p-2 flex flex-col justify-between flex-grow gap-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="font-semibold text-sm max-sm:text-xs line-clamp-2 hover:underline">
              {name}
            </CardTitle>
            <Rating rating={vote_average} />
          </div>
          <div className="flex items-end gap-2 flex-wrap truncate max-sm:gap-1">
            {genre_list.slice(0, 2).map((genre) => (
              <Badge
                key={useId()}
                variant={"secondary"}
                className="cursor-text text-gray-500 max-sm:text-2xs max-sm:px-1"
                title={genre}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
