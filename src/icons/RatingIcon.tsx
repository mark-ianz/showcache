import { StarFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

const RatingIcon = ({ color, className }: { color?: string; className?: ClassNameValue }) => {
  return <StarFilledIcon color={color} className={cn("max-sm:w-3", className)}/>;
};


export default RatingIcon;
