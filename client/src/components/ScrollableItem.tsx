import { getImg } from "@/lib/helpers";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent } from "./ui/card";

type Props = {
  image_path: string;
  title?: string;
  subtext?: string;
};

export default function ScrollableItem({ image_path, title, subtext }: Props) {
  return (
    <li className="min-w-36 cursor-pointer">
      <Card className="h-full">
        <CardContent>
          <AspectRatio ratio={2/3}>
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
    </li>
  );
}
