import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/language-provider";
import { getCasts, getDirectors, getOneMovie, getTrailers } from "@/lib/api";
import { getImg } from "@/lib/constants";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, HeartIcon, Play } from "lucide-react";
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

  const { data: directors } = useQuery({
    queryKey: ["directors", language, id],
    queryFn: getDirectors,
  });

  const { data: trailers } = useQuery({
    queryKey: ["trailers", language, id],
    queryFn: getTrailers,
  });

  const { data: casts } = useQuery({
    queryKey: ["casts", language, id],
    queryFn: getCasts,
  });

  const genreList = data?.genres.map((genre) => genre.name);
  const directorList = directors?.map((director) => director.name);
  const year = data && new Date(data?.release_date).getFullYear();
  const officialTrailer = trailers?.find(
    (trailer) => trailer.name === "Official Trailer"
  );

  if (!casts) return <p>loading</p>;
  return (
    <>
      <main className={`w-full relative`}>
        <section
          className="p-6"
          style={{
            backgroundImage: `url(${getImg(data?.backdrop_path!, "w1280")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
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
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground italic">{`"${data?.tagline}"`}</p>
                <div>
                  <p className="text-xl font-bold">Overview</p>
                  <p>{data?.overview}</p>
                </div>
                <p className="text-muted-foreground">
                  Directed by {directorList?.join(", ")}
                </p>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"secondary"}
                      className="gap-1"
                      disabled={!officialTrailer}
                    >
                      {officialTrailer ? (
                        <>
                          <Play className="w-5 h-5" />
                          <p> Play Trailer</p>
                        </>
                      ) : (
                        "No Available Trailer"
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-screen-lg p-0 border-none bg-none">
                    {officialTrailer && (
                      <div className="aspect-video relative">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 relative">
          <p className="relative text-3xl font-semibold">Cast</p>
          <ScrollArea className="w-full h-full relative">
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-background"></div>
            <ol className="flex gap-3 items-stretch overflow-x-auto p-4">
              {casts.slice(0, 14).map((cast) => (
                <li className="min-w-36">
                  <Card className="h-full">
                    <CardContent>
                      <div>
                        <img
                          src={getImg(cast.profile_path, "w780")}
                          alt={`Image of ${cast.name}`}
                          className="rounded-t-xl"
                        />
                      </div>
                      <div className="p-2">
                        <p className="font-semibold line-clamp-2">
                          {cast.name}
                        </p>
                        <p className="text-sm font-thin text-muted-foreground line-clamp-2">
                          {cast.character}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
              {casts.length > 14 && (
                <li className="min-w-36">
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-center h-full">
                      <div className="flex items-center gap-1">
                        <p>View More</p>
                        <ArrowRight />
                      </div>
                    </CardContent>
                  </Card>
                </li>
              )}
            </ol>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </main>
    </>
  );
}
