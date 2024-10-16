import { getImg } from "@/lib/helpers";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

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
    <li className={cn(lastItem && "z-10", "w-48 max-md:w-40 max-sm:w-32")}>
      <Link to={path}>
        <Card className="h-full">
          <CardContent>
            <AspectRatio ratio={2 / 3}>
              <img
                src={getImg(image_path, "w780")}
                alt={`Image of ${title}`}
                className="w-full h-full object-cover object-center rounded-t-md"
              />
            </AspectRatio>

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
