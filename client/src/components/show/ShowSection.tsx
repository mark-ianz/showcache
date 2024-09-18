import { Movie, TV } from "@/pages/LandingPage";
import ShowCard from "./ShowCard";
import ShowListWrapper from "./ShowListWrapper";
import no_image from "@/assets/no-image.png";
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
          <li key={show.id} onClick={() => console.log(show)}>
            <Link to={`/${isTv ? "tv" : "movie"}/${show.id}`}>
              <ShowCard
                genre_ids={show.genre_ids}
                vote_average={show.vote_average}
                name={isTv ? (show as TV).name : (show as Movie).title}
                image={
                  show.poster_path
                    ? "https://image.tmdb.org/t/p/w400" + show.poster_path
                    : no_image
                }
              />
            </Link>
          </li>
        ))}
      </ShowListWrapper>
    </section>
  );
}
