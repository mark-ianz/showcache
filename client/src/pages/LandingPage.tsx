import doctor_strange from "../assets/doctor_strange.jpg";
import ss from "../assets/ss.jfif";
import { useId } from "react";
import MovieCard from "@/components/MovieCard";

export default function LandingPage() {
  const movies = [
    {
      id: useId(),
      name: "Doctor Strange",
      image: doctor_strange,
    },
    {
      id: useId(),
      name: "Shawshank Redemption",
      image: ss,
    },
    {
      id: useId(),
      name: "Doctor Strange",
      image: doctor_strange,
    },
    {
      id: useId(),
      name: "Shawshank Redemption Test Haw jkahdjkawhdkjahw ajkdhaskjdhaskdjahsdkjashdkjashdjkas",
      image: ss,
    },
    {
      id: useId(),
      name: "Shawshank Redemption asdHG ajsdas AKHJSGD jh",
      image: ss,
    },
  ];

  return (
    <main>
      <ul className="grid grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard name={movie.name} image={movie.image} />
          </li>
        ))}
      </ul>
    </main>
  );
}
