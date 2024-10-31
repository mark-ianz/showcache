import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = { children: string; className?: ClassNameValue };

export default function HeaderText({ children, className }: Props) {
  return (
    <p className={cn("text-3xl font-bold max-md:text-2xl max-sm:text-xl", className)}>
      {children}
    </p>
  );
}
