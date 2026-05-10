import { useState } from "react";
import { nav_lists } from "@/lib/constants";
import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Searchbar from "../Searchbar";
import LanguageSelect from "../menu/LanguageSelect";
import ThemeSwitch from "../menu/ThemeSwitch";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] p-0 mr-4 mt-2 bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl overflow-hidden" align="end">
        <ScrollArea className="h-[75vh] p-4">
          <div className="flex flex-col gap-4">
            <div className="md:hidden">
              <Searchbar onSearch={() => setOpen(false)} />
            </div>
            
            <div className="flex flex-col gap-2">
              {nav_lists.map(({ name, path, icon, submenu }: any, index) => {
                const IconComponent = (Icons as any)[icon];
                const isExpanded = expandedItems.includes(name);
                
                return (
                  <div key={index + name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <NavLink 
                        to={path} 
                        onClick={() => !submenu && setOpen(false)}
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-4 py-3 text-base font-semibold transition-all rounded-xl w-full ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`
                        }
                      >
                        {IconComponent && <IconComponent size={20} />}
                        <span>{name}</span>
                      </NavLink>
                      {submenu && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleExpand(name);
                          }}
                          className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <ChevronDown size={18} />
                        </Button>
                      )}
                    </div>

                    {submenu && isExpanded && (
                      <div className="flex flex-col gap-1 ml-9 border-l border-border/50 pl-4 py-1">
                        {submenu.map((item: any, subIndex: number) => (
                          <NavLink
                            key={subIndex + item.name}
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm rounded-lg transition-all ${
                                isActive 
                                  ? "bg-primary text-primary-foreground font-medium" 
                                  : "text-muted-foreground hover:bg-secondary"
                              }`
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="px-4 py-2 flex flex-col gap-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Settings</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Language</span>
              <LanguageSelect />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Appearance</span>
              <ThemeSwitch />
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
