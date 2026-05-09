import { Input } from "../ui/input";
import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  className?: ClassNameValue;
};

import { Search } from "lucide-react";

export default function Searchbar({ className }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      navigate(`/results?query=${inputRef.current.value}`);
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={cn("relative w-full group", className)}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      <Input
        ref={inputRef}
        name="query"
        placeholder="Search movies, TV shows, people..."
        className="w-full pl-10 bg-muted/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all h-10 text-sm"
      />
    </form>
  );
}

