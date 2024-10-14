import NavList from "./NavList";
import { Separator } from "@/components/ui/separator";

type Props = { className?: string | undefined };

export default function MenuNav({ className }: Props) {
  return (
    <div className={className}>
      <p className="text-lg font-semibold">Navigation</p>
      <Separator className="my-2" />
      <NavList className="flex-col" />
    </div>
  );
}
