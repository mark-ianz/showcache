import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { getImg } from "@/lib/helpers";
import { Season } from "@/types/tv";
import Rating from "../Rating";

export default function SeasonCard({ season }: { season: Season }) {
  console.log(season);
  return (
    <li className="">
      <Link to={"#"}>
        <Card>
          <CardContent className="flex">
            <div>
              <img
                src={getImg(season.poster_path, "w780")}
                alt={`Image of ${season.name}`}
                className="rounded-l-xl max-w-[130px] min-w-[130px] object-cover"
              />
            </div>
            <div className="p-2 w-full flex flex-col gap-2 justify-between">
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
                <p className="text-sm font-thin text-muted-foreground line-clamp-6">
                  {season.overview || "No overview."}
                </p>
              </div>
              <p className="text-sm font-thin text-muted-foreground">Episode Count: {season.episode_count}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
