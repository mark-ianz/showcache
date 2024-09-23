import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

type Props = { children: ReactNode; className: ClassNameValue };

export default function HeaderText({ children, className }: Props) {
  return (
    <p className={cn("relative text-3xl font-semibold", className)}>
      {children}
    </p>
  );
}
