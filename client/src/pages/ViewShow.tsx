import { useLanguage } from "@/components/context/language-provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getOneMovie } from "@/lib/api";
import { getImg } from "@/lib/constants";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ViewShow() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getOneMovie,
  });

  console.log(data);
  return (
    <main className="w-full">
      <AspectRatio ratio={16 / 5} className="relative">
        <span className="absolute inset-0 bg-black bg-opacity-55"></span>
        <img
          src={getImg(data?.backdrop_path!, "w1280")}
          alt={data?.title + "backdrop"}
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <div className="mt-8 border rounded-lg p-4">
        <div className="flex gap-2 font-thin">
          <p>108 min</p>
          <p>Action/Comedy</p>
          <p>2024</p>
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-4xl font-bold">Deadpool & Wolverine</p>
          <div className="flex items-center gap-1">
            <p className="font-thin">8.2</p>
            <StarFilledIcon />
          </div>
        </div>
        <p>{data?.overview}</p>
      </div>
    </main>
  );
}
