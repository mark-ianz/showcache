import ErrorComponent from "../ErrorComponent";
import ShowCardSkeleton from "./ShowCardSkeleton";
import ShowCard from "./ShowCard";
import ShowListWrapper from "./ShowListWrapper";
import { Movie, TV } from "@/types/show";
import { Link } from "react-router-dom";

type ShowSectionProps = {
  showArray: (Movie | TV)[] | undefined;
  title?: string;
  subtitle?: string;
  exploreLink?: string;
  isTv?: boolean;
  error: Error | null;
  loading: boolean;
  children?: React.ReactNode;
};

export default function ShowSection({
  showArray,
  title,
  subtitle,
  exploreLink,
  isTv,
  error,
  loading,
  children,
}: ShowSectionProps) {

  if (error) return <ErrorComponent error={error}/>

  return (
    <section className="mb-16">
      {title && (
        <div className="flex items-end justify-between mb-8 border-b border-border/40 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm font-medium">
                {subtitle}
              </p>
            )}
          </div>
          {exploreLink && (
            <Link 
              to={exploreLink} 
              className="text-primary hover:underline text-sm font-bold flex items-center gap-1 transition-all"
            >
              Explore All <span className="text-lg leading-none">›</span>
            </Link>
          )}
        </div>

      )}


      {loading ? (
        <ShowListWrapper>
          {Array.from({ length: 12 }).map((_, i) => (
            <li key={i}>
              <ShowCardSkeleton />
            </li>
          ))}
        </ShowListWrapper>
      ) : (
        Array.isArray(showArray) && (
          <ShowListWrapper>
            {showArray?.length === 0 && <p>No result found</p>}
            {showArray?.filter(Boolean).map((show) => (
              <li key={show.id}>
                <ShowCard
                  path={`/${isTv ? "tv" : "movie"}/${show.id}`}
                  genre_ids={show.genre_ids}
                  vote_average={show.vote_average}
                  name={isTv ? (show as TV).name : (show as Movie).title}
                  image_path={show.poster_path}
                  release_date={isTv ? (show as TV).first_air_date : (show as Movie).release_date}
                />

              </li>
            ))}
            {children}
          </ShowListWrapper>
        )
      )}
    </section>
  );
}

