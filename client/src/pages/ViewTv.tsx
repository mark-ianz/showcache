import ScrollableItem from "@/components/ScrollableItem";
import ScrollableSection from "@/components/ScrollableSection";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCredits } from "@/api/credits.service";
import {
  getImages,
  getTrailers,
  getTvRecommendations,
} from "@/api/show.service";
import { Cast, Crew } from "@/types/credits";
import MediaTabs from "@/components/MediaTabs";
import { Movie, TV } from "@/types/show";
import ShowCard from "@/components/show/ShowCard";
import { getTvFullDetails } from "@/api/tv.service";
import ViewTvInfoSection from "@/components/show/ViewTvInfoSection";
import Seasons from "@/components/Seasons";

export default function ViewTv() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getTvFullDetails,
    staleTime: 1000 * 60 * 5,
  });

  const { data: trailers } = useQuery({
    queryKey: ["trailers", "tv", language, id],
    queryFn: getTrailers,
    staleTime: 1000 * 60 * 5,
  });

  const { data: credits } = useQuery({
    queryKey: ["credits", "tv", language, id],
    queryFn: getCredits,
    staleTime: 1000 * 60 * 5,
  });

  const { data: images } = useQuery({
    queryKey: ["images", "tv", id],
    queryFn: getImages,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["tv_recommendations", language, id],
    queryFn: getTvRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (!data || !credits || !trailers || !images || !recommendations)
    return <p>loading</p>;

  console.log(data);
  const genreList = data?.genres.map((genre) => genre.name);
  const year = data && new Date(data.first_air_date).getFullYear();
  const directors = data.created_by.map((director) => director.name);
  const officialTrailer = trailers.find(
    (trailer) => trailer.name === "Official Trailer" || trailer.official
  );

  console.log(images);
  const scrollItems: (Cast | Crew)[] =
    credits.cast.length > 14
      ? credits.cast.slice(0, 14)
      : [...credits.cast, ...credits.crew.slice(0, 14 - credits.cast.length)];

  return (
    <>
      <main className="w-full relative flex flex-col gap-10">
        <ViewTvInfoSection
          directorList={directors}
          showData={data}
          genreList={genreList}
          year={year}
          officialTrailer={officialTrailer}
        />

        <ScrollableSection
          viewMore={scrollItems.length >= 14}
          viewMoreLink="#"
          title="Cast"
        >
          {scrollItems.map((credit: Cast | Crew, index: number) => (
            <ScrollableItem
              path={"/person/" + credits.id}
              lastItem={index + 1 === scrollItems.length}
              key={`${credit.id}-${
                "character" in credit ? credit.character : credit.job
              }-${index}`}
              image_path={credit.profile_path}
              title={credit.name}
              subtext={"character" in credit ? credit.character : credit.job} // Type narrowing
            />
          ))}
        </ScrollableSection>

        <Seasons seasons={data.seasons}/>

        {images.backdrops.length > 0 && images.posters.length > 0 && (
          <MediaTabs
            tabs={[
              { images: images.backdrops, value: "Backdrops" },
              { images: images.posters, value: "Posters" },
            ]}
          />
        )}

        {recommendations.length > 0 && (
          <ScrollableSection title="Recommendations">
            {recommendations.map((tv: TV) => (
              <li className="min-w-48" key={tv.id}>
                <ShowCard
                  path={"/tv/" + tv.id}
                  genre_ids={tv.genre_ids}
                  vote_average={tv.vote_average}
                  name={tv.name}
                  image_path={tv.poster_path}
                />
              </li>
            ))}
          </ScrollableSection>
        )}
      </main>
    </>
  );
}
