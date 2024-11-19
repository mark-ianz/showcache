import Rating from "@/components/Rating";
import ViewImage from "@/components/ViewImage";
import { getImg } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Image } from "@/types/images";
import { ClassNameValue } from "tailwind-merge";

export function MediaList({
  images,
  className,
}: {
  images: Image[];
  className?: ClassNameValue;
}) {
  const mediaOrientation =
    images[0].aspect_ratio > 1.5 ? "landscape" : "portrait";

  return (
    <ol
      className={cn(
        "grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 w-full",
        className
      )}
    >
      {images.map((image) => (
        <ViewImage
          src={image.file_path}
          mediaType="show"
          mediaOrientation={mediaOrientation}
        >
          <li className={cn("border shadow-md rounded-md text-sm grow")}>
            <div>
              <img
                src={getImg({
                  path: image.file_path,
                  size: "w780",
                  mediaType: "show",
                })}
                className="w-full h-full object-cover object-center rounded-t-md"
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
  );
}
