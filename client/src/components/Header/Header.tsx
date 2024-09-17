import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Logo from "./Logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Settings from "./Settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

export default function Header() {
  const [searchFor, setSearchFor] = useState<string>("movie");

  return (
    <>
      <header className="flex items-center justify-between border-b pb-3 mb-4 w-full">
        <Logo className={"mr-20"} />
        <div className="flex grow gap-4 items-center">
          <div className="grow max-w-md ml-auto flex relative">
            <Input
              placeholder="Search for Movies or TV Shows"
              className="pr-20"
            />
            <Select value={searchFor} onValueChange={setSearchFor}>
              <SelectTrigger className="absolute w-fit gap-1 top-1/2 -translate-y-1/2 right-2 text-xs p-1 h-auto border-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="tv">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <HamburgerMenuIcon className="w-8 min-w-6 h-8 min-h-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="mt-2 flex flex-col gap-4 text-sm"
            >
              <Settings />
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </>
  );
}

// Your personal show collection
