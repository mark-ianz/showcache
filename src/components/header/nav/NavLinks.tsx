import { nav_lists } from "@/lib/constants";
import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import { ChevronDown } from "lucide-react";

export default function NavLinks() {
  return (
    <div className="flex items-center gap-1">
      {nav_lists.map(({ name, path, icon, submenu }: any, index) => {
        const IconComponent = (Icons as any)[icon];
        
        return (
          <div key={index + name} className="relative group px-1">
            <NavLink 
              to={path} 
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full hover:bg-primary/10 hover:text-primary whitespace-nowrap ${isActive ? "active" : "text-muted-foreground"}`
              }
            >
              {IconComponent && <IconComponent size={16} strokeWidth={2.5} />}
              <span>{name}</span>
              {submenu && <ChevronDown size={14} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
            </NavLink>

            {submenu && (
              <div className="absolute top-full left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[100]">
                <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-2 overflow-hidden">
                  {submenu.map((item: any, subIndex: number) => (
                    <NavLink
                      key={subIndex + item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
