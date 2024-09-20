import { useLanguage } from "@/context/language-provider";
import RatingIcon from "@/icons/RatingIcon";
import { getOneMovie } from "@/lib/api";
import { getImg } from "@/lib/constants";
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
      <div className="flex gap-10 relative z-10">
        <img
          src={getImg(data?.poster_path!, "w300")}
          alt={data?.title + "backdrop"}
          className="object-cover rounded-lg"
        />
        <div>
          <div className="flex gap-4 font-thin">
            <p>{data?.runtime} min</p>
            <p>{genreList?.join(" / ")}</p>
            <p>{year}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-4xl font-bold">{data?.title}</p>
            <div className="flex items-center gap-1">
              <p className="font-thin">8.2</p>
              <RatingIcon />
            </div>
          </div>
          <p className="text-muted-foreground italic">{`"${data?.tagline}"`}</p>
          <p className="text-xl font-bold mt-4">Overview</p>
          <p>{data?.overview}</p>
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
