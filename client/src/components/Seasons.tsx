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
      <ol className="grid grid-cols-6 gap-4 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2">
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
