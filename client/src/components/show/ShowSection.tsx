import ShowCard from "./ShowCard";
import ShowListWrapper from "./ShowListWrapper";
import no_image from "@/assets/no-image.png";
import { Movie, TV } from "@/types/show";
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";

type ShowSectionProps = {
  showArray: Movie[] | TV[] | undefined;
  title: string;
  isTv?: boolean;
  error: Error | null;
  loading: boolean;
};

export default function ShowSection({
  showArray,
  title,
  isTv,
  error,
  loading,
}: ShowSectionProps) {
  return (
    <section>
      <p className="text-2xl mb-3">{title}</p>
      <p>{error?.message}</p>
      <div className="flex items-center justify-center">
        {loading && <LoaderIcon />}
      </div>
      <ShowListWrapper>
        {showArray?.map((show) => (
          <li key={show.id}>
            <ShowCard
              path={`/${isTv ? "tv" : "movie"}/${show.id}`}
              genre_ids={show.genre_ids}
              vote_average={show.vote_average}
              name={isTv ? (show as TV).name : (show as Movie).title}
              image_path={show.poster_path}
            />
          </li>
        ))}
      </ShowListWrapper>
    </section>
  );
}
