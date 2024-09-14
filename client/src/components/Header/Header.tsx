import { Settings } from "lucide-react";
import ThemeSwitch from "../ThemeSwitchButton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Logo from "./Logo";
import { Separator } from "../ui/separator";
import { useTheme } from "@/theme-provider";
import ThemeSwitch2 from "../ThemeSwitch2";
import LanguageSelect from "../LanguageSelect";

export default function Header() {
  const { theme } = useTheme();
  return (
    <>
      <header className="flex items-center justify-between border-b pb-3 mb-4 w-full">
        <Logo className={"mr-20"} />
        <div className="flex grow gap-4 items-center">
          <Input
            className="max-w-md ml-auto grow"
            placeholder="Search for Movies or TV Shows"
          />
          <Button>Login</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Settings className="w-8 min-w-6 h-8 min-h-6" />
            </PopoverTrigger>
            <PopoverContent align="end" className="mt-2">
              <p className="text-lg font-semibold">Settings</p>
              <Separator className="my-2" />
              <div className="flex flex-col gap-4">
                <ThemeSwitch2 />
                <LanguageSelect />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </>
  );
}

// Your personal show collection
