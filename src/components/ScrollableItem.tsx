import { getImg } from "@/lib/helpers";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Props = {
  image_path: string;
  title?: string;
  subtext?: string;
  lastItem?: boolean;
  path: string;
  mediaType: "show" | "person";
};

export default function ScrollableItem({
  image_path,
  title,
  subtext,
  lastItem,
  path,
  mediaType,
}: Props) {
  return (
    <li className={cn(lastItem && "z-10")}>
      <Link to={path}>
        <Card className="h-full">
          <CardContent>
            <div className="w-40 h-52 max-xl:w-36 max-xl:h-48 max-lg:w-32 max-lg:h-44 max-[500px]:w-28 max-[500px]:h-36">
              <img
                src={getImg({ path: image_path, size: "w300", mediaType })}
                alt={`Image of ${title}`}
                className="w-full h-full object-cover object-center rounded-t-md"
              />
            </div>
            <div className="p-2 max-md:text-sm max-sm:text-xs">
              <p className="font-semibold line-clamp-2">{title}</p>
              <p className="font-thin text-muted-foreground line-clamp-2">
                {subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
