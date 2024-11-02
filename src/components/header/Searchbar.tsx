import { Input } from "../ui/input";
import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  className?: ClassNameValue;
};

export default function Searchbar({ className }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      navigate(
        `/results?query=${inputRef.current.value}`
      );
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={cn("grow max-w-md ml-auto flex relative", className)}
    >
      <Input
        ref={inputRef}
        name="query"
        placeholder="Search for Movies, TV Shows or Person"
        className="max-lg:text-xs"
      />
    </form>
  );
}
