import { Season } from "@/types/tv";
import HeaderText from "./HeaderText";
import SeasonCard from "./show/SeasonCard";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  seasons: Season[];
};

export default function Seasons({ seasons }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isFewSeasons = seasons.length > 3;
  return (
    <section className="gap-2 flex flex-col">
      <HeaderText>Seasons</HeaderText>
      <div className="relative">
        <ScrollArea>
          <ol
            className={cn(
              "flex flex-col gap-2",
              !isExpanded && isFewSeasons
                ? "overflow-hidden max-h-64"
                : "max-h-[700px] max-lg:max-h-[600px] max-md:max-h-[500px]"
            )}
          >
            {seasons.map((season) => (
              <SeasonCard key={season.id} season={season} />
            ))}
          </ol>
        </ScrollArea>

        {/* If few seasons, remove the expandable shits */}
        {!isExpanded && isFewSeasons && (
          <div className="bg-transparent absolute inset-0"></div>
        )}
        {isFewSeasons && (
          <div
            className={cn(
              "w-full mt-5 flex items-center justify-center",
              !isExpanded &&
                "bg-gradient-to-b from-transparent to-background absolute bottom-0 h-20 mt-0"
            )}
          >
            <Button
              size={"icon"}
              className="rounded-full p-2 border-0 w-12 h-12"
              variant={"secondary"}
              asChild
              onClick={() => setIsExpanded((e) => !e)}
            >
              {isExpanded ? (
                <ArrowUp className="cursor-pointer" />
              ) : (
                <ArrowDown className="cursor-pointer" />
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
