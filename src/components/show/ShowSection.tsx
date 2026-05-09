import ErrorComponent from "../ErrorComponent";
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
  if (error) return <ErrorComponent error={error}/>

  return (
    <section className="mb-12">
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
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
