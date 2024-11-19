import { useState } from "react";
import { Button } from "../../ui/button";
import { PopoverTrigger, Popover, PopoverContent } from "../../ui/popover";
import { useLanguage } from "../../../context/language-provider";
import { languages } from "@/constants/languages";
import { cn } from "@/lib/utils";

export default function LanguageSelect() {
  const [open, setOpen] = useState<boolean>(false);
  const { setLanguage, language } = useLanguage();

  return (
    <div className="flex items-start justify-center flex-col">
      <p className="text-md font-semibold">Language</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full cursor-pointer" variant={"outline"} size={"sm"} asChild>
            <p className="max-sm:text-xs">
              Select Language:
              <span className="ml-1 font-bold">{language.english_name}</span>
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent asChild>
          <ul className="grid grid-cols-3">
            {languages.map((arrLanguage, index) => (
              <Button
                asChild
                key={index + arrLanguage.iso_639_1}
                variant={"ghost"}
                onClick={() => {
                  setOpen(!open);
                  setLanguage(arrLanguage);
                }}
                className={cn(
                  "cursor-pointer",
                  arrLanguage.iso_639_1 === language.iso_639_1 &&
                    "text-tertiary"
                )}
              >
                <li>{arrLanguage.english_name}</li>
              </Button>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
