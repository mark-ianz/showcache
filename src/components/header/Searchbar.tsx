import { Input } from "../ui/input";
import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  className?: ClassNameValue;
  onSearch?: () => void;
};

import { Search } from "lucide-react";

export default function Searchbar({ className, onSearch }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      navigate(`/results?query=${inputRef.current.value}`);
      inputRef.current.value = "";
      inputRef.current.blur();
      onSearch?.();
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={cn("search-container group", className)}
    >
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
      <input
        ref={inputRef}
        name="query"
        placeholder="Search movies, TV shows, people..."
        className="search-input"
      />
    </form>
  );
}

