import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

type MovieCardProps = { name: string; image: string };

export default function MovieCard({ name, image }: MovieCardProps) {
  return (
    <Card className="border cursor-pointer w-full h-full flex flex-col overflow-hidden">
      <img src={image} alt="image" className="rounded-t-xl" />
      <CardContent className="p-4 flex flex-col justify-between flex-grow min-h-40">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 hover:underline">{name}</h3>
        </div>
        <Button variant={"default"} className="rounded-full w-full">
          Watch Later
        </Button>
      </CardContent>
    </Card>
  );
}
