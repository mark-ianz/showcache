import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = { biography: string[]; person: string };

export default function Biography({ biography, person }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const isShort = biography.join(" ").length < 700;

  return (
    <div className="max-md:text-sm">
      <p className="text-xl font-semibold mb-2">Biography</p>
      <div
        className={cn(
          "flex flex-col gap-2 text-muted-foreground overflow-hidden relative",
          !isExpanded && "h-60 md:h-40",
          isShort && "h-auto overflow-visible"
        )}
      >
        {biography && biography.length > 0
          ? biography?.map((bio, index) => (
              <p key={index + bio.length}>{bio}</p>
            ))
          : "No biography of " + person}
        {isExpanded ||
          (!isShort && (
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-background"></div>
          ))}
      </div>
      {!isShort && (
        <div className="flex justify-end">
          <p
            className="text-tertiary underline cursor-pointer"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {!isExpanded ? "See More..." : "See Less..."}
          </p>
        </div>
      )}
    </div>
  );
}
