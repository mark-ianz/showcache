import { ClassNameValue } from "tailwind-merge";
import NavList from "./NavList";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = { className?: ClassNameValue };

export default function MenuNav({ className }: Props) {
  return (
    <div className={cn(className)}>
      <p className="text-lg font-semibold max-md:text-base">Navigation</p>
      <Separator className="my-2" />
      <NavList className="flex-col" />
    </div>
  );
}
