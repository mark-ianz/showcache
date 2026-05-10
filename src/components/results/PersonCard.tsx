import { AspectRatio } from "../ui/aspect-ratio";
import { getImg } from "@/lib/helpers";
import { Link } from "react-router-dom";

type PersonCardProps = {
  name: string;
  image_path: string | null;
  department: string;
  id: number;
};

export default function PersonCard({
  name,
  image_path,
  department,
  id,
}: PersonCardProps) {
  return (
    <Link to={`/person/${id}`} className="group block">
      <div className="flex flex-col gap-2">
        <div className="saas-card overflow-hidden rounded-none border-none shadow-none">
          <AspectRatio ratio={2 / 3} className="overflow-hidden">
            <img
              src={getImg({ path: image_path, size: "w500", mediaType: "person" })}
              alt={`Profile image of ${name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-0.5 px-0.5">
          <h3 className="font-bold text-[15px] leading-tight line-clamp-1 group-hover:text-primary transition-colors text-foreground">
            {name}
          </h3>
          <div className="flex items-center justify-between text-muted-foreground/80">
            <span className="text-[13px] font-medium">
              {department}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
