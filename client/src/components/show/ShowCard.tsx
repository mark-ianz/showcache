import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

type ShowCardProps = { name: string; image: string };

export default function ShowCard({ name, image }: ShowCardProps) {
  return (
    <Card className="border cursor-pointer w-full h-full flex flex-col overflow-hidden">
      <img src={image} alt="image" className="rounded-t-xl" loading="lazy" />
      <CardContent className="p-2 flex flex-col justify-between flex-grow min-h-28">
        <CardTitle className="font-semibold text-sm line-clamp-1 mb-2 hover:underline">
          {name}
        </CardTitle>
        <Button variant={"default"} className="rounded-full w-full" size={"sm"}>
          Watch Later
        </Button>
      </CardContent>
    </Card>
  );
}
