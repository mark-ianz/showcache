import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import HeaderText from "./HeaderText";

type Props = {
  children: ReactNode;
  viewMore?: boolean;
  viewMoreLink?: string;
  title?: string;
};

export default function ScrollableSection({
  children,
  viewMore,
  viewMoreLink,
  title,
}: Props) {
  return (
    <div className="relative">
      {title && <HeaderText>{title}</HeaderText>}
      <ScrollArea className="w-full">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-background z-10"></div>
        <ol className="flex gap-3 items-stretch overflow-x-auto py-4 justify-center">
          {children}
          {viewMore && viewMoreLink && (
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
