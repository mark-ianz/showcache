import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Logo from "./Logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Settings from "./Settings";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between border-b pb-3 mb-4 w-full">
        <Logo className={"mr-20"} />
        <div className="flex grow gap-4 items-center">
          <Searchbar />
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
