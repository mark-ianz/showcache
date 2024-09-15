import { languages } from "@/lib/constants";
import { useId, useState } from "react";
import { Button } from "./ui/button";
import { PopoverTrigger, Popover, PopoverContent } from "./ui/popover";
import { useLanguage } from "./context/language-provider";

export default function LanguageSelect() {
  const [open, setOpen] = useState<boolean>(false);

  const { setLanguage } = useLanguage();

  return (
    <div className="flex items-start justify-center flex-col">
      <p className="text-md font-semibold">Language</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full" variant={"outline"} size={"sm"}>
            Select Language
          </Button>
        </PopoverTrigger>
        <PopoverContent asChild>
          <ul className="flex flex-col gap-2">
            {languages.map((language) => (
              <Button
                asChild
                key={useId()}
                variant={"ghost"}
                onClick={() => {
                  setOpen(!open);
                  setLanguage(language.iso_639_1);
                }}
                className="cursor-pointer"
              >
                <li>{language.english_name}</li>
              </Button>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
