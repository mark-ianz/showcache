import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { getGenre } from "@/lib/utils";
import { useId } from "react";
import Rating from "../Rating";
import { AspectRatio } from "../ui/aspect-ratio";

type ShowCardProps = {
  name: string;
  image: string;
  vote_average: number;
  genre_ids: number[];
};

export default function ShowCard({
  name,
  image,
  vote_average,
  genre_ids,
}: ShowCardProps) {
  const genre_list = getGenre(genre_ids);

  return (
    <Card className="cursor-pointer w-full h-full flex flex-col">
      <AspectRatio ratio={2/3}>
        <img
          src={image}
          alt={`Poster image of ${name}`}
          className="w-full h-full object-cover rounded-t-xl"
          loading="lazy"
        />
      </AspectRatio>
      <CardContent className="p-2 flex flex-col justify-between flex-grow gap-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-sm line-clamp-1 hover:underline">
            {name}
          </CardTitle>
          <Rating rating={vote_average} />
        </div>
        <div className="flex items-end gap-2 flex-wrap truncate">
          {genre_list.slice(0, 2).map((genre) => (
            <Badge
              key={useId()}
              variant={"secondary"}
              className="cursor-text text-gray-500"
              title={genre}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
