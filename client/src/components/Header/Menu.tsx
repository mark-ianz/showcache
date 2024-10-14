import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Settings from "./menu/Settings";
import MenuNav from "./nav/MenuNav";

export default function Menu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <HamburgerMenuIcon className="w-8 min-w-6 h-8 min-h-6 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent align="end" className="mt-2 flex flex-col gap-4 text-sm">
        <div className="flex flex-col gap-4">
          <MenuNav className="hidden max-md:block"/>
          <Settings />
        </div>
      </PopoverContent>
    </Popover>
  );
}
