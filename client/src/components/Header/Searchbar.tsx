import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useState } from "react";

export default function Searchbar() {
  const [searchFor, setSearchFor] = useState<string>("movie");

  return (
    <form action="/results" className="grow max-w-md ml-auto flex relative">
      <Input name="search" placeholder="Search for Movies or TV Shows" className="pr-20" />
      <Select value={searchFor} onValueChange={setSearchFor}>
        <SelectTrigger className="absolute w-fit gap-1 top-1/2 -translate-y-1/2 right-2 text-xs p-1 h-auto border-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv">TV Show</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
}
