import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getImg } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ScrollableSection({ children }: Props) {
  return (
    <div className="mt-10 relative">
      <p className="relative text-3xl font-semibold">Cast</p>
      <ScrollArea className="w-full h-full relative">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-background z-10"></div>
        <ol className="flex gap-3 items-stretch overflow-x-auto py-4 pl-4 pr-10">
          {children}
          <li className="min-w-36">
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-full">
                <div className="flex items-center gap-1">
                  <p>View More</p>
                  <ArrowRight />
                </div>
              </CardContent>
            </Card>
          </li>
        </ol>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
