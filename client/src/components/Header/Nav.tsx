import { useId } from "react";
import { Button } from "../ui/button";

export default function Nav() {
  const lists: { name: string; id: string }[] = [
    {
      name: "New Releases",
      id: useId(),
    },
    {
      name: "Top Rated",
      id: useId(),
    },
    {
      name: "Movies",
      id: useId(),
    },
    {
      name: "TV Shows",
      id: useId(),
    },
    {
      name: "Discover",
      id: useId(),
    },
  ];

  return (
    <nav className="w-full">
      <ol className="flex justify-around">
        {lists.map(({ name }, id) => (
          <Button key={id} asChild variant={"link"}>
            <li className="cursor-pointer text-lg">{name}</li>
          </Button>
        ))}
      </ol>
    </nav>
  );
}
