import { Button } from "./ui/button";
import { useTheme } from "@/theme-provider";
import { Check } from "lucide-react";

export default function () {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <p>Theme</p>
      <div className="flex justify-between mt-2">
        <div className="flex justify-center items-center gap-1">
          <Button
            variant={"outline"}
            size={"icon"}
            asChild
            className={`rounded-full border cursor-pointer ${
              theme === "light" && "border-tertiary"
            }`}
            onClick={() => setTheme("light")}
          >
            <span className="bg-white w-9 h-9 hover:bg-gray-300">
              {theme === "light" && <Check color="#3b82f6" />}
            </span>
          </Button>
          <p className="text-sm">Light</p>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Button
            variant={"outline"}
            asChild
            size={"icon"}
            className={`rounded-full border cursor-pointer ${
              theme === "dark" && "border-blue-500"
            }`}
            onClick={() => setTheme("dark")}
          >
            <span className="bg-black w-9 h-9 hover:bg-gray-700">
              {theme === "dark" && <Check color="#3b82f6" />}
            </span>
          </Button>
          <p className="text-sm">Dark</p>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Button
            variant={"outline"}
            size={"icon"}
            asChild
            className={`rounded-full border cursor-pointer ${
              theme === "system" && "border-tertiary"
            }`}
            onClick={() => setTheme("system")}
          >
            <span className="w-9 h-9 rounded-full bg-[linear-gradient(to_right,black_50%,white_50%)]">
              {theme === "system" && <Check color="#3b82f6" />}
            </span>
          </Button>
          <p className="text-sm">System</p>
        </div>
      </div>
    </div>
  );
}
