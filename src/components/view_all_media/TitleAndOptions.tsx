import HeaderText from "../HeaderText";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Filter } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type Props = { title: string; className?: ClassNameValue };

export default function TitleAndOptions({ title, className }: Props) {
  return (
    <div className={cn(className, "mb-6 max-xl:mb-4 max-lg:mb-2")}>
      <HeaderText>{`All Media for ${title}`}</HeaderText>
      <div className="flex items-center mt-2">
        <Button variant={"ghost"} className="flex items-center gap-1 p-2">
          <p>Sort By</p>
          <CaretSortIcon className="w-5 h-5" />
        </Button>
        <Button variant={"ghost"} className="flex items-center gap-1 p-2">
          <p>Filter</p>
          <Filter className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
