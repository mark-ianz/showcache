import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { getImg } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  children: ReactNode | string;
  src: string;
  mediaType?: "show" | "person";
  alt?: string;
  mediaOrientation?: "portrait" | "landscape";
  className?: ClassNameValue;
};

export default function ViewImage({
  children,
  src,
  alt,
  mediaType,
  mediaOrientation,
  className
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className={cn(className, "flex items-center justify-center")}>{children}</DialogTrigger>
      <DialogContent className={cn("p-0 border-0 w-[500px] max-w-[90vw]", mediaOrientation === "landscape" && "w-screen max-w-[1000px]")} aria-describedby={undefined}>
        <VisuallyHidden.Root>
          <DialogTitle>Image</DialogTitle>
        </VisuallyHidden.Root>
        <div className="w-full h-full">
          <img
            src={getImg({ path: src, size: "original", mediaType })}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
