import Rating from "@/components/Rating";
import ViewImage from "@/components/ViewImage";
import { getImg } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Image } from "@/types/images";
import { ClassNameValue } from "tailwind-merge";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export function MediaList({
  images,
  className,
}: {
  images: Image[];
  className?: ClassNameValue;
}) {
  const [visibleCount, setVisibleCount] = useState(18);
  
  if (!images || images.length === 0) return null;

  const mediaOrientation =
    images[0].aspect_ratio > 1.5 ? "landscape" : "portrait";

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div className="flex flex-col gap-8">
      <ol
        className={cn(
          "grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 w-full",
          className
        )}
      >
        {visibleImages.map((image) => (
          <ViewImage
            key={image.file_path}
            src={image.file_path}
            mediaType="show"
            mediaOrientation={mediaOrientation}
          >
            <li className={cn("border shadow-md rounded-md text-sm grow w-full")}>
              <div>
                <img
                  src={getImg({
                    path: image.file_path,
                    size: "w500",
                    mediaType: "show",
                  })}
                  className="w-full h-full object-cover object-center rounded-t-md"
                  loading="lazy"
                />
              </div>
              <div className="p-2 relative flex flex-col gap-2 border-t max-md:gap-1">
                <div className="flex items-start absolute right-2">
                  <Rating rating={image.vote_average} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs">Size</p>
                  <p>{image.width + "x" + image.height}</p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs">Aspect Ratio</p>
                  <p>{image.aspect_ratio}</p>
                </div>
              </div>
            </li>
          </ViewImage>
        ))}
      </ol>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setVisibleCount(prev => prev + 18)}
            className="group px-8 font-bold border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            Load More 
            <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      )}
    </div>
  );
}
