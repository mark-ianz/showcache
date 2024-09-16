import { Movie, TV } from "@/pages/LandingPage";
import ShowCard from "./ShowCard";
import ShowListWrapper from "./ShowListWrapper";
import no_image from "@/assets/no-image.png";

type ShowSectionProps = {
  showArray: Movie[] | TV[];
  title: string;
  isTv?: boolean;
};

export default function ShowSection({
  showArray,
  title,
  isTv,
}: ShowSectionProps) {
  return (
    <section>
      <p className="text-2xl mb-3">{title}</p>
      <ShowListWrapper>
        {showArray?.map((show) => (
          <li key={show.id}>
            <ShowCard
              name={isTv ? (show as TV).name : (show as Movie).title}
              image={
                show.poster_path
                  ? "https://image.tmdb.org/t/p/w400" + show.poster_path
                  : no_image
              }
            />
          </li>
        ))}
      </ShowListWrapper>
    </section>
  );
}
