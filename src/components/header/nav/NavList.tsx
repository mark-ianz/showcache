import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  className?: ClassNameValue;
};

export default function NavList({ className }: Props) {
  return (
    <ol className={cn("flex justify-center items-center gap-2", className)}>
      <NavLinks />
    </ol>
  );
}
