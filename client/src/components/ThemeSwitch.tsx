import { useTheme } from "@/theme-provider";
import { Switch } from "./ui/switch";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <p className="text-sm">Dark Mode</p>
    </div>
  );
}
