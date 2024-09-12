import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

type MovieCardProps = { name: string; image: string };

export default function MovieCard({ name, image }: MovieCardProps) {
  return (
    <Card className="border cursor-pointer w-full h-full flex flex-col overflow-hidden">
      <img src={image} alt="image" className="rounded-t-xl" />
      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{name}</h3>
        </div>
        <Button variant={"default"} className="rounded-full w-full mt-auto">
          Watch Later
        </Button>
      </CardContent>
    </Card>
  );
}

{
  /* <Card className="border cursor-pointer min-h-[500px]">
  <img src={image} alt="image" className="rounded-t-xl" />
  <CardContent className="py-4 px-2 flex flex-col items-start justify-between h-full">
    <CardTitle>{name}</CardTitle>
    <Button variant={"default"} className="rounded-full w-full mt-auto">
      Watch Later
    </Button>
  </CardContent>
</Card>; */
}

{
  /* <Card className="overflow-hidden flex flex-col">
  <div className="aspect-[2/3] relative">
    <img
      src={image}
      alt={name}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
  <CardContent className="flex-grow flex flex-col p-4">
    <CardTitle className="mb-2">{name}</CardTitle>
    <Button variant="default" className="mt-auto w-full">
      Watch Later
    </Button>
  </CardContent>
</Card>;
 */
}

{
  /* <Card className="w-full h-full flex flex-col overflow-hidden">
      <div className="aspect-[2/3] relative">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{name}</h3>
        </div>
        <Button variant="default" className="w-full">
          Watch Later
        </Button>
      </CardContent>
    </Card> */
}
