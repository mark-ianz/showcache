import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import { Play } from "lucide-react";

export default function Logo({ className }: { className?: ClassNameValue }) {
  return (
    <Link to={"/"} className={cn("flex items-center gap-2 group", className)}>
      <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
        <Play className="fill-primary-foreground text-primary-foreground h-4 w-4" />
      </div>
      <h1 className="font-extrabold text-2xl tracking-tighter text-foreground uppercase italic">
        Show<span className="text-primary">Cache</span>
      </h1>
    </Link>
  );
}
