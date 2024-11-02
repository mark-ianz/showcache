import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { getImg } from "@/lib/helpers";
import { Season } from "@/types/tv";
import Rating from "../Rating";
import { AspectRatio } from "../ui/aspect-ratio";

export default function SeasonCard({ season }: { season: Season }) {
  return (
    <li className="">
      <Link to={"#"}>
        <Card>
          <CardContent className="flex gap-1">
            <div className="w-52">
              <AspectRatio ratio={2 / 3}>
                <img
                  src={getImg({path: season.poster_path, size: "w780", mediaType: "show"})}
                  alt={`Image of ${season.name}`}
                  className="w-full h-full rounded-l-xl object-cover"
                />
              </AspectRatio>
            </div>
            <div className="p-2 w-full flex flex-col gap-2 justify-between max-md:text-sm max-xsm:text-xs">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="font-semibold">
                    {season.name}{" "}
                    <span className="font-thin">
                      ({new Date(season.air_date).getFullYear()})
                    </span>
                  </p>
                  <Rating rating={season.vote_average} />
                </div>
                <p className="font-thin text-muted-foreground line-clamp-6">
                  {season.overview || "No overview."}
                </p>
              </div>
              <p className="font-thin text-muted-foreground">
                Episode Count: {season.episode_count}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
