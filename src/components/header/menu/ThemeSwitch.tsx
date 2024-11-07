import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { useTheme } from "@/theme-provider";
import { Check } from "lucide-react";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="text-sm">
      <p className="text-md font-semibold">Theme</p>
      <div className="flex justify-between">
        <div
          className="flex justify-center items-center gap-1"
          onClick={() => setTheme("light")}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            asChild
            className={cn(
              "rounded-full border cursor-pointer",
              theme === "light" && "border-2 border-tertiary"
            )}
          >
            <span className="bg-white w-9 h-9 hover:bg-gray-300 max-md:w-8 max-md:h-8 max-sm:w-7 max-sm:h-7 max-[400px]:w-6 max-[400px]:h-6">
              {theme === "light" && <Check color="#3b82f6" />}
            </span>
          </Button>
          <p className="text-sm max-sm:text-xs">Light</p>
        </div>
        <div
          className="flex justify-center items-center gap-1"
          onClick={() => setTheme("dark")}
        >
          <Button
            variant={"outline"}
            asChild
            size={"icon"}
            className={cn(
              "rounded-full border cursor-pointer",
              theme === "dark" && "border-2 border-tertiary"
            )}
          >
            <span className="bg-black w-9 h-9 hover:bg-gray-700 max-md:w-8 max-md:h-8 max-sm:w-7 max-sm:h-7 max-[400px]:w-6 max-[400px]:h-6">
              {theme === "dark" && <Check color="#3b82f6" />}
            </span>
          </Button>
          <p className="text-sm max-sm:text-xs">Dark</p>
        </div>
        <div
          className="flex justify-center items-center gap-1"
          onClick={() => setTheme("system")}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            asChild
            className={cn(
              "rounded-full border cursor-pointer",
              theme === "system" && "border-2 border-tertiary"
            )}
          >
            <span className="w-9 h-9 rounded-full bg-[linear-gradient(to_right,black_50%,white_50%)] max-md:w-8 max-md:h-8 max-sm:w-7 max-sm:h-7 max-[400px]:w-6 max-[400px]:h-6 ">
              {theme === "system" && <Check color="#3b82f6" />}
            </span>
          </Button>
          <p className="text-sm max-sm:text-xs">System</p>
        </div>
      </div>
    </div>
  );
}
