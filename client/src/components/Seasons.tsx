import { Season } from "@/types/tv";
import HeaderText from "./HeaderText";
import ScrollableItem from "./ScrollableItem";

type Props = {
  seasons: Season[];
};

export default function Seasons({ seasons }: Props) {
  return (
    <section className="gap-2 flex flex-col">
      <HeaderText>Seasons</HeaderText>
      <ol className="grid grid-cols-4 gap-4">
        {seasons.map((season) => (
          <ScrollableItem
            key={season.id}
            image_path={season.poster_path}
            path="#"
            title={`${season.name} (${season.episode_count} eps)`}
            subtext={season.overview}
          />
        ))}
      </ol>
    </section>
  );
}
