import { useId } from "react";
import { Button } from "../ui/button";

export default function Nav() {
  const lists: { name: string; id: string }[] = [
    {
      name: "Top Rated",
      id: useId(),
    },
    {
      name: "New Releases",
      id: useId(),
    },
    {
      name: "TV Shows",
      id: useId(),
    },
    {
      name: "People",
      id: useId(),
    },
    {
      name: "Upcoming",
      id: useId(),
    },
  ];

  return (
    <nav className="w-full mb-20">
      <ol className="flex justify-between">
        {lists.map(({ name, id }) => (
          <Button key={id} asChild variant={"link"}>
            <li className="cursor-pointer text-lg">{name}</li>
          </Button>
        ))}
      </ol>
    </nav>
  );
}
