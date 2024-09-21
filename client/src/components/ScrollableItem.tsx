import { Card, CardContent } from "./ui/card";
import { getImg } from "@/lib/constants";

type Props = {
  image_path: string;
  title: string;
  subtext: string;
};

export default function ScrollableItem({ image_path, title, subtext }: Props) {
  return (
    <li className="min-w-36">
      <Card className="h-full">
        <CardContent>
          <div>
            <img
              src={getImg(image_path, "w780")}
              alt={`Image of ${title}`}
              className="rounded-t-xl min-h-50 object-cover"
            />
          </div>
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
