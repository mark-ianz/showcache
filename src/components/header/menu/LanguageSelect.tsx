import { useState } from "react";
import { Button } from "../../ui/button";
import { PopoverTrigger, Popover, PopoverContent } from "../../ui/popover";
import { useLanguage } from "../../../context/language-provider";
import { languages } from "@/constants/languages";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export default function LanguageSelect() {
  const [open, setOpen] = useState<boolean>(false);
  const { setLanguage, language } = useLanguage();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2 hover:bg-primary/10 hover:text-primary transition-colors">
          <Languages size={18} />
          <span className="uppercase text-xs font-bold">{language.iso_639_1}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="grid grid-cols-2 gap-1">
          {languages.map((arrLanguage, index) => (
            <Button
              key={index + arrLanguage.iso_639_1}
              variant="ghost"
              size="sm"
              onClick={() => {
                setOpen(false);
                setLanguage(arrLanguage);
              }}
              className={cn(
                "justify-start text-xs",
                arrLanguage.iso_639_1 === language.iso_639_1 && "bg-primary/10 text-primary font-bold"
              )}
            >
              {arrLanguage.english_name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
