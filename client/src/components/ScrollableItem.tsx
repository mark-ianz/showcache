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
};

export default function ScrollableItem({
  image_path,
  title,
  subtext,
  lastItem,
  path,
}: Props) {
  return (
    <li className={cn(lastItem && "z-10")}>
      <Link to={path}>
        <Card className="h-full w-48 max-md:w-36">
          <CardContent>
            <div>
              <img
                src={getImg(image_path, "w780")}
                alt={`Image of ${title}`}
                className="h-72 object-cover rounded-t-md max-md:h-60"
              />
            </div>
            <div className="p-2 max-md:text-sm">
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
