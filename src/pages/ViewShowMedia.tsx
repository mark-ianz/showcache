import { getShowImages } from "@/api/show.service";
import ErrorComponent from "@/components/ErrorComponent";
import HeaderText from "@/components/HeaderText";
import LoadingAnimation from "@/components/LoadingAnimation";
import Rating from "@/components/Rating";
import ViewImage from "@/components/ViewImage";
import { getImg } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Image } from "@/types/images";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function MediaList({ images }: { images: Image[] }) {
  const mediaOrientation =
    images[0].aspect_ratio > 1.5 ? "landscape" : "portrait";

  return (
    <ol className={cn("grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 w-full")}>
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

export default function ViewShowMedia() {
  const { type, id } = useParams();

  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["show_media", id, type],
    queryFn: getShowImages,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorComponent error={error} />;

  return (
    images && (
      <main className="w-full">
        <HeaderText>Media</HeaderText>
        <div className="flex gap-10 justify-between max-lg:gap-6 max-md:gap-4">
          <section className="grow">
            <HeaderText className="mb-2">Backdrops</HeaderText>
            <MediaList images={images.backdrops} />
          </section>
          <section className="grow">
            <HeaderText className="mb-2">Posters</HeaderText>
            <MediaList images={images.posters} />
          </section>
        </div>
      </main>
    )
  );
}
