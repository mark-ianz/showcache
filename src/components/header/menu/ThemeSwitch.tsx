import { Button } from "../../ui/button";
import { useTheme } from "@/theme-provider";
import { Sun, Moon, Laptop } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  const themes = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", icon: Laptop },
  ];

  const CurrentIcon = themes.find(t => t.name === theme)?.icon || Sun;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2 hover:bg-primary/10 hover:text-primary transition-colors">
          <CurrentIcon size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1" align="end">
        <div className="flex flex-col">
          {themes.map(({ name, icon: Icon }) => (
            <Button
              key={name}
              variant="ghost"
              size="sm"
              onClick={() => setTheme(name as any)}
              className="justify-start gap-2 capitalize text-xs"
            >
              <Icon size={14} />
              {name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
