import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type Props =
  | {
      children: ReactNode;
      viewMore?: true;
      viewMoreLink: string;
      title: string;
    }
  | {
      children: ReactNode;
      viewMore?: false;
      viewMoreLink?: undefined;
      title: string;
    };

export default function ScrollableSection({
  children,
  viewMore,
  viewMoreLink,
  title,
}: Props) {
  return (
    <div className="mt-10 relative">
      <p className="relative text-3xl font-semibold">{title}</p>
      <ScrollArea className="w-full h-full relative">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-background z-10"></div>
        <ol className="flex gap-3 items-stretch overflow-x-auto py-4 pl-4 pr-10">
          {children}
          {viewMore && (
            <li className="min-w-36 z-10">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center h-full">
                  <Button asChild variant={"link"}>
                    <Link
                      to={viewMoreLink}
                      className="flex items-center gap-1 outline-none"
                    >
                      <p>View More</p>
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </li>
          )}
        </ol>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
