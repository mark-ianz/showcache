import HeaderText from "../HeaderText";
import LoadingAnimation from "../LoadingAnimation";
import ShowCard from "./ShowCard";
import ShowListWrapper from "./ShowListWrapper";
import { Movie, TV } from "@/types/show";

type ShowSectionProps = {
  showArray: Movie[] | TV[] | undefined;
  title?: string;
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
  if (error) {
    return <p>There was a server error. Please try again later.</p>;
  }

  return (
    <section>
      {title && (
        <HeaderText className="font-normal mb-2 text-2xl max-md:text-xl">
          {title}
        </HeaderText>
      )}
      {loading && <LoadingAnimation />}
      {showArray && (
        <ShowListWrapper>
          {showArray.length === 0 && <p>No result found</p>}
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
      )}
    </section>
  );
}
