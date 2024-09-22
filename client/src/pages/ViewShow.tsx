import ScrollableItem from "@/components/ScrollableItem";
import ScrollableSection from "@/components/ScrollableSection";
import ViewShowInfoSection from "@/components/show/ViewShowInfoSection";
import { useLanguage } from "@/context/language-provider";
import { getCasts, getDirectors, getOneMovie, getTrailers } from "@/lib/api";
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
  console.log(data);
  const officialTrailer = trailers?.find(
    (trailer) => trailer.name === "Official Trailer" || trailer.official
  );

  if (!data || !casts || !trailers) return <p>loading</p>;

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

        <ScrollableSection viewMore viewMoreLink="#" title="Cast">
          {casts.slice(0, 14).map((cast) => (
            <ScrollableItem
              key={cast.id}
              image_path={cast.profile_path}
              title={cast.name}
              subtext={cast.character}
            />
          ))}
        </ScrollableSection>
      </main>
    </>
  );
}
