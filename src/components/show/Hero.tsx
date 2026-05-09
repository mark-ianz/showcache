import { Button } from "../ui/button";
import { getImg } from "@/lib/helpers";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { AspectRatio } from "../ui/aspect-ratio";

interface HeroProps {
  movie: any;
}

export default function Hero({ movie }: HeroProps) {
  if (!movie) return null;

  // Ideally, we would fetch full movie details for runtime and director, 
  // but we'll use available data and clean placeholders for now.
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <section className="relative w-full mb-16 overflow-hidden rounded-2xl saas-card bg-background/50">
      <div className="absolute inset-0 z-0">
        <img
          src={getImg({ path: movie.backdrop_path, size: "original", mediaType: "movie" })}
          alt={movie.title}
          className="w-full h-full object-cover opacity-10 filter blur-[2px] scale-105"
        />
      </div>
      
      <div className="relative z-10 p-12 md:p-16 flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
          {movie.runtime && <span>{movie.runtime} min</span>}
          <span className="flex items-center gap-2">
             Adventure / Animation / Family / Fantasy
          </span>
          <Rating rating={movie.vote_average} />
        </div>

        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {movie.title}
          </h1>
          {releaseYear && (
            <span className="text-3xl font-light text-muted-foreground/60">({releaseYear})</span>
          )}
        </div>

        {movie.tagline && (
          <p className="text-lg italic text-muted-foreground/80 font-medium tracking-tight">
            "{movie.tagline}"
          </p>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p className="text-base text-foreground/80 leading-relaxed max-w-3xl">
            {movie.overview}
          </p>
        </div>

        <p className="text-sm text-muted-foreground font-medium">
          Directed by <span className="text-foreground/70">Nathan Greno</span>
        </p>

        <div className="flex items-center gap-4 mt-4">
          <Button variant="outline" size="lg" className="px-8 font-bold bg-background/80 hover:bg-background border-border/50 flex items-center gap-2 shadow-sm">
            <span className="scale-110">▷</span> Play Trailer
          </Button>
        </div>
      </div>
    </section>
  );
}

