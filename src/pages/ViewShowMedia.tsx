import { getShowImages } from "@/api/show.service";
import ErrorComponent from "@/components/ErrorComponent";
import HeaderText from "@/components/HeaderText";
import LoadingAnimation from "@/components/LoadingAnimation";
import ViewImage from "@/components/ViewImage";
import { getImg } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Image, ImageResult } from "@/types/images";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {};

function MediaList({ images }: { images: Image[] }) {
  return (
    <ol className="flex flex-wrap gap-2">
      {images.map((image) => (
        <ViewImage
          src={image.file_path}
          mediaType="show"
          mediaOrientation={image.aspect_ratio > 1.5 ? "landscape" : "portrait"}
        >
          <li className={cn(image.aspect_ratio > 1.5 ? "w-60" : "w-36")}>
            <img
              src={getImg({
                path: image.file_path,
                size: "w300",
                mediaType: "show",
              })}
            />
          </li>
        </ViewImage>
      ))}
    </ol>
  );
}

export default function ViewShowMedia({}: Props) {
  const { type, id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["all_show_images", id, type],
    queryFn: getShowImages,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorComponent error={error} />;

  return (
    data && (
      <main>
        <HeaderText>Media</HeaderText>
        <div className="flex gap-4">
          <section className="w-1/2">
            <HeaderText className="mb-2">Backdrops</HeaderText>
            <MediaList images={data?.backdrops} />
          </section>
          <section className="w-1/2">
            <HeaderText className="mb-2">Posters</HeaderText>
            <MediaList images={data?.posters} />
          </section>
        </div>
      </main>
    )
  );
}
