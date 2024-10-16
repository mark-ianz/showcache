import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import HeaderText from "./HeaderText";

type Props = {
  children: ReactNode;
  title?: string;
};

export default function ScrollableSection({
  children,
  title,
}: Props) {
  return (
    <div>
      {title && <HeaderText className="pb-2">{title}</HeaderText>}
      <ScrollArea className="w-full">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-background z-10"></div>
        <ol className="flex gap-3 items-stretch overflow-x-auto pb-4 justify-start">
          {children}
        </ol>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
