import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  className?: ClassNameValue;
};

export default function Searchbar({ className }: Props) {
  const navigate = useNavigate();
  const [searchFor, setSearchFor] = useState<string>("movie");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      navigate(`/results?query=${inputRef.current.value}&searchFor=${searchFor}`);
      inputRef.current.value = "";
      inputRef.current.blur();
    };
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
        className="pr-20"
      />
      <Select value={searchFor} onValueChange={setSearchFor}>
        <SelectTrigger className="absolute w-fit gap-1 top-1/2 -translate-y-1/2 right-2 text-xs p-1 h-auto border-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv">TV Show</SelectItem>
          <SelectItem value="person">Person</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
}
