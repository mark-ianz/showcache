import ScrollableSection from "@/components/ScrollableSection";
import ViewShowInfoSection from "@/components/show/ViewShowInfoSection";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-provider";
import { getCasts, getDirectors, getOneMovie, getTrailers } from "@/lib/api";
import { getImg } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";

export default function ViewShow() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getOneMovie,
    staleTime: 1000 * 60 * 5,
  });

  const { data: directors } = useQuery({
    queryKey: ["directors", language, id],
    queryFn: getDirectors,
    staleTime: 1000 * 60 * 5,
  });

  const { data: trailers } = useQuery({
    queryKey: ["trailers", language, id],
    queryFn: getTrailers,
    staleTime: 1000 * 60 * 5,
  });

  const { data: casts } = useQuery({
    queryKey: ["casts", language, id],
    queryFn: getCasts,
    staleTime: 1000 * 60 * 5,
  });

  const genreList = data?.genres.map((genre) => genre.name);
  const directorList = directors?.map((director) => director.name);
  const year = data && new Date(data?.release_date).getFullYear();
  console.log(trailers);
  const officialTrailer = trailers?.find(
    (trailer) => trailer.name === "Official Trailer" || trailer.official
  );

  if (!casts) return <p>loading</p>;

  return (
    <>
      <main className={`w-full relative`}>
        <ViewShowInfoSection
          showData={data!}
          genreList={genreList!}
          directorList={directorList!}
          year={year!}
          officialTrailer={officialTrailer!}
        />

        <ScrollableSection>
          {casts.slice(0, 14).map((cast) => (
            <li className="min-w-36" key={cast.id}>
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
                    <p className="font-semibold line-clamp-2">{cast.name}</p>
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
        </ScrollableSection>
      </main>
    </>
  );
}
