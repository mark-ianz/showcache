import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = { children: string; className?: ClassNameValue };

export default function HeaderText2({ children, className }: Props) {
  return (
    <p className={cn("text-xl font-semibold max-sm:text-lg", className)}>
      {children}
    </p>
  );
}