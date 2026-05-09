import Rating from "../Rating";
import { AspectRatio } from "../ui/aspect-ratio";
import { getGenre, getImg } from "@/lib/helpers";
import { Link } from "react-router-dom";


type ShowCardProps = {
  name: string;
  image_path: string;
  vote_average: number;
  genre_ids: number[];
  path: string;
};

export default function ShowCard({
  name,
  image_path,
  vote_average,
  genre_ids,
  path,
}: ShowCardProps) {
  const genre_list = getGenre(genre_ids);

  return (
    <Link to={path} className="group block h-full">
      <div className="saas-card overflow-hidden rounded-lg h-full flex flex-col">
        <AspectRatio ratio={2 / 3} className="overflow-hidden">
          <img
            src={getImg({ path: image_path, size: "w780", mediaType: "show" })}
            alt={`Poster image of ${name}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </AspectRatio>
        <div className="p-3 flex flex-col gap-1.5 flex-grow">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5">
              {genre_list.slice(0, 1).map((genre, index) => (
                <span
                  key={index}
                  className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                >
                  {genre}
                </span>
              ))}
            </div>
            <Rating rating={vote_average} />
          </div>
        </div>
      </div>
    </Link>
  );
}

