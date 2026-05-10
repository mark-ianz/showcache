import { nav_lists } from "@/lib/constants";
import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";

export default function NavLinks() {
  return (
    <div className="flex items-center gap-2">
      {nav_lists.map(({ name, path, icon }, index) => {
        const IconComponent = (Icons as any)[icon];
        
        return (
          <NavLink 
            key={index + name} 
            to={path} 
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full hover:bg-primary/10 hover:text-primary whitespace-nowrap ${isActive ? "active" : "text-muted-foreground"}`
            }
          >
            {IconComponent && <IconComponent size={16} strokeWidth={2.5} />}
            <span>{name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
