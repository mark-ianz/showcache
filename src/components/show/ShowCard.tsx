import Rating from "../Rating";
import { AspectRatio } from "../ui/aspect-ratio";
import { getGenre, getImg } from "@/lib/helpers";
import { Link } from "react-router-dom";
import AccountActionsMenu from "./AccountActionsMenu";


type ShowCardProps = {
  id: number;
  mediaType: "movie" | "tv";
  name: string;
  image_path: string;
  vote_average: number;
  genre_ids: number[];
  path: string;
  onRemove?: () => void;
  removeLabel?: string;
};

export default function ShowCard({
  id,
  mediaType,
  name,
  image_path,
  vote_average,
  genre_ids,
  path,
  release_date,
  onRemove,
  removeLabel,
}: ShowCardProps & { release_date?: string | Date }) {
  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";

  return (
    <div className="group relative">
      <div className="absolute top-2 right-2 z-30">
        <AccountActionsMenu 
          mediaType={mediaType} 
          mediaId={id} 
          onRemove={onRemove}
          removeLabel={removeLabel}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <Link to={path} className="block">
      <div className="flex flex-col gap-2">
        <div className="saas-card overflow-hidden rounded-none border-none shadow-none">
          <AspectRatio ratio={2 / 3} className="overflow-hidden">
            <img
              src={getImg({ path: image_path, size: "w500", mediaType: "show" })}
              alt={`Poster image of ${name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-0.5 px-0.5">
          <h3 className="font-bold text-[15px] leading-tight line-clamp-1 group-hover:text-primary transition-colors text-foreground">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground/60 text-[11px] font-medium line-clamp-1">
            {getGenre(genre_ids).slice(0, 2).join(" • ")}
          </div>
          <div className="flex items-center justify-between text-muted-foreground/80">
            <span className="text-[13px] font-medium">
              {releaseYear}
            </span>
            <Rating rating={vote_average} />
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}



