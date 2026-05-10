import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";

export default function ShowCarouselWrapper({ children }: { children: ReactNode }) {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full relative group/carousel"
    >
      <CarouselContent className="-ml-4 sm:-ml-6">
        {children}
      </CarouselContent>
      
      {/* Navigation Buttons - Hidden on mobile, shown on hover for desktop */}
      <div className="hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <CarouselPrevious className="-left-6 bg-background/80 backdrop-blur-md border-border/50 hover:bg-background" />
        <CarouselNext className="-right-6 bg-background/80 backdrop-blur-md border-border/50 hover:bg-background" />
      </div>

      {/* Subtle Gradient Overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </Carousel>
  );
}
