import { useTheme } from "@/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-full"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
