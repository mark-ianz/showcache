import { Button } from "../ui/button";
import { getGenre, getImg, getShowType } from "@/lib/helpers";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { useQuery } from "@tanstack/react-query";
import { getCredits } from "@/api/credits.service";
import { useLanguage } from "@/context/language-provider";
import { Info } from "lucide-react";

interface HeroProps {
  movie: any;
}

export default function Hero({ movie }: HeroProps) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const showType = getShowType(movie);

  const { data: credits } = useQuery({
    queryKey: ["credits", showType, language, movie?.id],
    queryFn: getCredits,
    enabled: !!movie?.id,
  });

  if (!movie) return null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
      ? new Date(movie.first_air_date).getFullYear()
      : "";

  const directors = credits?.crew
    .filter((c) => c.job === "Director")
    .map((d) => d.name)
    .join(", ");

  const genres = movie.genre_ids ? getGenre(movie.genre_ids).join(" / ") : "";

  return (
    <section className="relative w-full overflow-hidden rounded-2xl saas-card bg-background/50">
      <div className="absolute inset-0 z-0">
        <img
          src={getImg({ path: movie.backdrop_path, size: "w1280", mediaType: "show" })}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover opacity-10 filter blur-[2px] scale-105"
        />
      </div>

      <div className="relative z-10 p-6 sm:p-12 md:p-16 flex flex-col gap-4 sm:gap-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-medium">
          {movie.runtime && <span>{movie.runtime} min</span>}
          <span className="flex items-center gap-2">
            {genres}
          </span>
          <Rating rating={movie.vote_average} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground line-clamp-2">
            {movie.title || movie.name}
          </h1>
          {releaseYear && (
            <span className="text-xl sm:text-3xl font-light text-muted-foreground/60">({releaseYear})</span>
          )}
        </div>

        {movie.tagline && (
          <p className="text-sm sm:text-lg italic text-muted-foreground/80 font-medium tracking-tight line-clamp-1">
            "{movie.tagline}"
          </p>
        )}

        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Overview</h2>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-3xl line-clamp-3">
            {movie.overview}
          </p>
        </div>

        {directors && (
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Directed by <span className="text-foreground/70">{directors}</span>
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
          <Button variant="outline" size="lg" className="flex-1 sm:flex-none px-4 sm:px-8 font-bold bg-background/80 hover:bg-background border-border/50 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base h-11 sm:h-12">
            <span className="scale-110">▷</span> Play Trailer
          </Button>

          <Link to={`/${showType}/${movie.id}`} className="flex-1 sm:flex-none">
            <Button variant="default" size="lg" className="w-full sm:w-auto px-4 sm:px-8 font-bold flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base h-11 sm:h-12">
              <Info size={18} />
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

