import ErrorComponent from "../ErrorComponent";
import ShowCardSkeleton from "./ShowCardSkeleton";
import ShowCard from "./ShowCard";
import ShowListWrapper from "./ShowListWrapper";
import ShowCarouselWrapper from "./ShowCarouselWrapper";
import { CarouselItem } from "@/components/ui/carousel";
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
  isCarousel?: boolean;
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
  isCarousel,
  children,
}: ShowSectionProps) {
  const Wrapper = isCarousel ? ShowCarouselWrapper : ShowListWrapper;
  const itemClass = isCarousel ? "pl-4 sm:pl-6 basis-[45%] sm:basis-[30%] md:basis-[22%] lg:basis-[16.6%] flex-shrink-0" : "";

  if (error) return <ErrorComponent error={error} />

  return (
    <section>
      {title && (
        <div className="flex items-center sm:items-end justify-between mb-8 border-b border-border/40 pb-4 gap-2 sm:gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-xs sm:text-sm font-medium line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
          {exploreLink && (
            <Link
              to={exploreLink}
              className="text-primary hover:underline text-sm font-bold flex items-center gap-1 transition-all whitespace-nowrap flex-shrink-0 mb-1"
            >
              Explore All <span className="text-lg leading-none">›</span>
            </Link>
          )}
        </div>

      )}


      {loading ? (
        <Wrapper>
          {(Array.from({ length: isCarousel ? 10 : 12 }) || []).map((_, i) => (
            <li key={i} className={isCarousel ? itemClass : ""}>
              <ShowCardSkeleton />
            </li>
          ))}
        </Wrapper>
      ) : (
        Array.isArray(showArray) && (
          <Wrapper>
            {(showArray?.length || 0) === 0 && <p>No result found</p>}
            {(showArray || []).filter(Boolean).map((show) => {
              const Item = isCarousel ? CarouselItem : "li";
              const type = show?.media_type || (isTv ? "tv" : "movie");
              const name = type === "tv" ? (show as TV)?.name : (show as Movie)?.title;
              const date = type === "tv" ? (show as TV)?.first_air_date : (show as Movie)?.release_date;
              
              return (
                <Item key={show?.id} className={itemClass}>
                  <ShowCard
                    id={show?.id}
                    mediaType={type as "movie" | "tv"}
                    path={`/${type}/${show?.id}`}
                    genre_ids={show?.genre_ids}
                    vote_average={show?.vote_average}
                    name={name}
                    image_path={show?.poster_path}
                    release_date={date}
                  />
                </Item>
              );
            })}
            {children}
          </Wrapper>
        )
      )}
    </section>
  );
}

