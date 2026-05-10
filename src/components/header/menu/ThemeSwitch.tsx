import { Button } from "../../ui/button";
import { useTheme } from "@/theme-provider";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="px-2 hover:bg-primary/10 hover:text-primary transition-colors"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
