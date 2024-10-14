import NavList from "./NavList";
import { Separator } from "@/components/ui/separator";

type Props = {};

export default function MenuNav({}: Props) {
  return (
    <div>
      <p className="text-lg font-semibold">Navigation</p>
      <Separator className="my-2"/>
      <NavList className="flex-col"/>
    </div>
  );
}
