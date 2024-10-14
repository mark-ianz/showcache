import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";

type Props = {
  className?: string | undefined;
};

export default function NavList({ className }: Props) {
  return (
    <ol className={cn("flex justify-around", className)}>
      <NavLinks />
    </ol>
  );
}
