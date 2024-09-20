import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-provider";
import { getOneMovie } from "@/lib/api";
import { getImg } from "@/lib/constants";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { HeartIcon, Play } from "lucide-react";
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

  const genreList = data?.genres.map((genre) => genre.name);
  const year = data && new Date(data?.release_date).getFullYear();

  return (
    <main
      className={`w-full relative p-6`}
      style={{
        backgroundImage: `url(${getImg(data?.backdrop_path!, "w1280")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
      <div className="flex gap-10 relative z-10 items-center">
        <img
          src={getImg(data?.poster_path!, "w300")}
          alt={data?.title + "backdrop"}
          className="object-cover rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-thin">
            <p>{data?.runtime} min</p>
            <p>{genreList?.join(" / ")}</p>
          </div>
          <div className="flex gap-4 items-center text-4xl">
            <p className="font-bold">{data?.title}</p>
            <p className="">({year})</p>
          </div>
          <div>
            <p className="text-muted-foreground italic">{`"${data?.tagline}"`}</p>
            <p className="text-xl font-bold mt-2">Overview</p>
            <p>{data?.overview}</p>
          </div>
          <div className="flex gap-4">
            <Button
              size={"icon"}
              className="rounded-full"
              variant={"secondary"}
            >
              <HeartIcon className="w-5 h-5" />
            </Button>
            <Button
              size={"icon"}
              className="rounded-full"
              variant={"secondary"}
            >
              <BookmarkIcon className="w-5 h-5" />
            </Button>
            <Button variant={"secondary"} className="gap-1">
              <Play className="w-5 h-5"/>
              <p>Play Trailer</p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <AspectRatio ratio={16 / 4} className="relative">
  <span className="absolute inset-0 bg-black bg-opacity-55"></span>
  <img
    src={getImg(data?.backdrop_path!, "w1280")}
    alt={data?.title + "backdrop"}
    className="w-full h-full object-cover"
  />
</AspectRatio> */
}
