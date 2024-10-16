import { nav_lists } from "@/lib/constants";
import { Button } from "../../ui/button";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return nav_lists.map(({ name, path }, index) => (
    <Button
      key={index + name}
      asChild
      variant={"link"}
      className="cursor-pointer text-md max-lg:text-sm"
    >
      <NavLink to={path}>{name}</NavLink>
    </Button>
  ));
}
