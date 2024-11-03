import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

type Props = { children: ReactNode; className?: ClassNameValue };

export default function ViewShowLayout({ children, className }: Props) {
  return (
    <main
      className={cn(
        "w-full relative flex flex-col gap-10 max-md:gap-6 max-sm:gap-4",
        className
      )}
    >
      {children}
    </main>
  );
}
