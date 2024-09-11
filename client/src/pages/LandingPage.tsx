import { Card, CardContent, CardTitle } from "@/components/ui/card";
import dummy from "../assets/my_president.png";
import doctor_strange from "../assets/doctor_strange.jpg";
import ss from "../assets/ss.jfif";
import { useId } from "react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const movies = [
    {
      id: useId(),
      name: "Doctor Strange",
      image: doctor_strange,
    },
    {
      id: useId(),
      name: "Shaw",
      image: ss,
    },
  ];

  return (
    <main>
      <ul className="grid grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Card className="border" key={movie.id}>
            <img src={movie.image} alt="image" className="rounded-t-xl" />
            <CardContent className="p-2 flex flex-col items-center">
              <CardTitle>{movie.name}</CardTitle>
              <Button variant={"default"} className="mt-4">Watch Later</Button>
            </CardContent>
          </Card>
        ))}
      </ul>
    </main>
  );
}
