import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { nav_lists } from "@/lib/constants";

export default function Nav() {
  return (
    <nav className="w-full mb-[5vh]">
      <ol className="flex justify-around">
        {nav_lists.map(({ name, path }, index) => (
          <Button
            key={index + name}
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
