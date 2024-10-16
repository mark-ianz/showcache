import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Settings from "./menu/Settings";
import MenuNav from "./nav/MenuNav";
import { useState } from "react";
import { X } from "lucide-react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="w-8 min-w-6 h-8 min-h-6 cursor-pointer">
          {isOpen ? (
            <X className="w-full h-full" />
          ) : (
            <HamburgerMenuIcon className="w-full h-full" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" className="mt-2 flex flex-col gap-4 text-sm">
        <div className="flex flex-col gap-4">
          <MenuNav className="hidden max-md:block" />
          <Settings />
        </div>
      </PopoverContent>
    </Popover>
  );
}
