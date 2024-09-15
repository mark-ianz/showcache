import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Logo from "./Logo";
import { Separator } from "../ui/separator";
import ThemeSwitch2 from "../ThemeSwitch2";
import LanguageSelect from "../LanguageSelect";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between border-b pb-3 mb-4 w-full">
        <Logo className={"mr-20"} />
        <div className="flex grow gap-4 items-center">
          <Input
            className="max-w-md ml-auto grow"
            placeholder="Search for Movies or TV Shows"
          />
          <Popover>
            <PopoverTrigger asChild>
              <HamburgerMenuIcon className="w-8 min-w-6 h-8 min-h-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="mt-2 flex flex-col gap-4 text-sm"
            >
              <div>
                <p className="text-lg font-semibold">Settings</p>
                <Separator className="my-2" />
                <div className="flex flex-col gap-4">
                  <ThemeSwitch2 />
                  <LanguageSelect />
                </div>
              </div>
              <div>
                <p className="text-md font-semibold">Account</p>
                <div className="flex flex-col gap-1">
                  <Button variant={"outline"} size={"sm"}>
                    Login
                  </Button>
                  <Button variant={"outline"} size={"sm"}>
                    Signup
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </>
  );
}

// Your personal show collection
