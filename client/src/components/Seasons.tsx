import { Season } from "@/types/tv";
import HeaderText from "./HeaderText";
import SeasonCard from "./show/SeasonCard";
import ScrollableSection from "./ScrollableSection";
import ScrollableItem from "./ScrollableItem";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

type Props = {
  seasons: Season[];
};

export default function Seasons({ seasons }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <section className="gap-2 flex flex-col">
      <HeaderText>Seasons</HeaderText>
      <div className="relative">
        <ScrollArea>
          <ol className="flex flex-col gap-2">
            {seasons.map((season) => (
              <SeasonCard key={season.id} season={season} />
            ))}
          </ol>
        </ScrollArea>
    
      </div>
    </section>
  );
}
