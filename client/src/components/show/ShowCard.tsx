import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { getGenre } from "@/lib/utils";
import { useId } from "react";

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
    <Card className="border cursor-pointer w-full h-full flex flex-col overflow-hidden">
      <img
        src={image}
        alt={`Poster image of ${name} movie`}
        className="rounded-t-xl w-full h-full object-cover"
        loading="lazy"
      />
      <CardContent className="p-2 flex flex-col justify-between flex-grow gap-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-sm line-clamp-1 hover:underline">
            {name}
          </CardTitle>
          <div className="flex items-center gap-1">
            <StarFilledIcon className="mt-[.15em]" color="#3b82f6" />
            <p>{vote_average.toFixed(1)}</p>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-wrap truncate">
          {genre_list.slice(0, 2).map((genre) => (
            <Badge
              key={useId()}
              variant={"secondary"}
              className="cursor-text"
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
