import { getImg } from "@/lib/helpers";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Props = {
  image_path: string;
  title?: string;
  subtext?: string;
  lastItem?: boolean;
  path: string;
};

export default function ScrollableItem({
  image_path,
  title,
  subtext,
  lastItem,
  path,
}: Props) {
  return (
    <li className={cn("min-w-48", lastItem && "z-10")}>
      <Link to={path}>
        <Card className="h-full">
          <CardContent>
            <AspectRatio ratio={2 / 3}>
              <img
                src={getImg(image_path, "w780")}
                alt={`Image of ${title}`}
                className="rounded-t-xl h-full w-full object-cover"
              />
            </AspectRatio>
            <div className="p-2">
              <p className="font-semibold line-clamp-2">{title}</p>
              <p className="text-sm font-thin text-muted-foreground line-clamp-2">
                {subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
