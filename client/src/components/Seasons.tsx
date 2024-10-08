import { Season } from "@/types/tv";
import HeaderText from "./HeaderText";
import SeasonCard from "./show/SeasonCard";

type Props = {
  seasons: Season[];
};

export default function Seasons({ seasons }: Props) {
  return (
    <section className="gap-2 flex flex-col">
      <HeaderText>Seasons</HeaderText>
      <ol className="flex flex-col gap-2">
        {seasons.map((season) => (
          <SeasonCard key={season.id} season={season} />
        ))}
      </ol>
    </section>
  );
}
