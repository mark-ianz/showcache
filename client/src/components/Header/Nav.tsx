import { useId } from "react";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const lists: { name: string; path: string }[] = [
    {
      name: "Home",
      path: "/",

    },
    {
      name: "Top Rated",
      path: "/top_rated",
    },
    {
      name: "Popular Movies",
      path: "/popular",
    },
    {
      name: "New Releases",
      path: "/new",
    },
    {
      name: "TV Shows",
      path: "/tv",
    },
    {
      name: "Upcoming",
      path: "/upcoming",
    },
  ];

  return (
    <nav className="w-full mb-[5vh]">
      <ol className="flex justify-around">
        {lists.map(({ name, path }) => (
          <Button
            key={useId()}
            asChild
            variant={"link"}
            className="cursor-pointer text-md"
          >
            <NavLink to={path}>{name}</NavLink>
          </Button>
        ))}
      </ol>
    </nav>
  );
}
