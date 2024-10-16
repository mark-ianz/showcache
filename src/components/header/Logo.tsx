import { DatabaseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import { Link } from "react-router-dom";

export default function Logo({ className }: { className?: ClassNameValue }) {
  return (
    <Link to={"/"} className={cn("flex items-center", className)}>
      <h1 className="font-bold text-2xl">Showcache</h1>
      <DatabaseIcon className="" />
    </Link>
  );
}
