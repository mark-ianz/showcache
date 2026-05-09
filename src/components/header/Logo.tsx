import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export default function Logo({ className }: { className?: ClassNameValue }) {
  return (
    <Link to={"/"} className={cn("flex items-center", className)}>
      <h1 className="font-bold text-xl tracking-tight text-foreground uppercase">
        Show<span className="text-primary">Cache</span>
      </h1>
    </Link>
  );
}
