import { nav_lists } from "@/lib/constants";
import { Button } from "../../ui/button";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return nav_lists.map(({ name, path }, index) => (
    <Button
      key={index + name}
      asChild
      variant="ghost"
      className="cursor-pointer text-sm font-medium hover:text-primary transition-colors px-4"
    >
      <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
        {name}
      </NavLink>
    </Button>

  ));
}
