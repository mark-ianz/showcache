import ScrollableItem from "@/components/ScrollableItem";
import ScrollableSection from "@/components/ScrollableSection";
import ViewShowInfoSection from "@/components/show/ViewShowInfoSection";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOneMovie } from "@/api/movies.service";
import { getCredits, getDirectors } from "@/api/credits.service";
import { getImages, getTrailers } from "@/api/show.service";
import { Cast, Crew } from "@/types/credits";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { getImg } from "@/lib/helpers";

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

  const { data: credits } = useQuery({
    queryKey: ["credits", language, id],
    queryFn: getCredits,
    staleTime: 1000 * 60 * 5,
  });

  const { data: images } = useQuery({
    queryKey: ["images", language, "movie", id],
    queryFn: getImages,
    staleTime: 1000 * 60 * 5,
  });

  if (!data || !credits || !trailers || !directors || !images)
    return <p>loading</p>;

  console.log(images);
  const genreList = data?.genres.map((genre) => genre.name);
  const directorList = directors.map((director) => director.name);
  const year = data && new Date(data.release_date).getFullYear();
  const officialTrailer = trailers.find(
    (trailer) => trailer.name === "Official Trailer" || trailer.official
  );

  const scrollItems: (Cast | Crew)[] =
    credits.cast.length > 14
      ? credits.cast.slice(0, 14)
      : [...credits.cast, ...credits.crew.slice(0, 14 - credits.cast.length)];

  return (
    <>
      <main className={`w-full relative`}>
        <ViewShowInfoSection
          showData={data}
          genreList={genreList}
          directorList={directorList}
          year={year}
          officialTrailer={officialTrailer}
        />

        <ScrollableSection
          viewMore={(scrollItems.length >= 14) as true} // broken as fuck, I don't know why this shit works
          viewMoreLink="#"
          title="Cast"
        >
          {scrollItems.map((credit: Cast | Crew, index: number) => (
            <ScrollableItem
              key={`${credit.id}-${
                "character" in credit ? credit.character : credit.job
              }-${index}`}
              image_path={credit.profile_path}
              title={credit.name}
              subtext={"character" in credit ? credit.character : credit.job} // Type narrowing
            />
          ))}
        </ScrollableSection>

        <section>
          <ScrollableSection
            viewMore={(images.posters.length >= 14) as true} // broken as fuck, I don't know why this shit works
            viewMoreLink="#"
            title="Posters"
          >
            {images.backdrops.slice(0, 14).map((backdrop, index) => (
              <li key={backdrop.file_path + index} className="w-[400px]">
                <AspectRatio ratio={backdrop.aspect_ratio}>
                  <img
                    src={getImg(backdrop.file_path, "w780")}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </li>
            ))}
          </ScrollableSection>
        </section>
      </main>
    </>
  );
}
