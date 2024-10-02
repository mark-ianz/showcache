import ScrollableItem from "@/components/ScrollableItem";
import ScrollableSection from "@/components/ScrollableSection";
import ViewShowInfoSection from "@/components/show/ViewMovieInfoSection";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieFullDetails } from "@/api/movies.service";
import { getCredits, getDirectors } from "@/api/credits.service";
import { getImages, getMovieRecommendations, getTrailers } from "@/api/show.service";
import { Cast, Crew } from "@/types/credits";
import { useState } from "react";
import MediaTabs from "@/components/MediaTabs";
import { Movie } from "@/types/show";
import ShowCard from "@/components/show/ShowCard";
import { getImg } from "@/lib/helpers";
import no_image from "@/assets/no-image.png";

export default function ViewMovie() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single_show", language, id],
    queryFn: getMovieFullDetails,
    staleTime: 1000 * 60 * 5,
  });

  const { data: directors } = useQuery({
    queryKey: ["directors", "movie", language, id],
    queryFn: getDirectors,
    staleTime: 1000 * 60 * 5,
  });

  const { data: trailers } = useQuery({
    queryKey: ["trailers", "movie", language, id],
    queryFn: getTrailers,
    staleTime: 1000 * 60 * 5,
  });

  const { data: credits } = useQuery({
    queryKey: ["credits", "movie", language, id],
    queryFn: getCredits,
    staleTime: 1000 * 60 * 5,
  });

  const { data: images } = useQuery({
    queryKey: ["images", "movie", id],
    queryFn: getImages,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["movie_recommendations", language, id],
    queryFn: getMovieRecommendations,
    staleTime: 1000 * 60 * 5,
  });

  if (
    !data ||
    !credits ||
    !trailers ||
    !directors ||
    !images ||
    !recommendations
  )
    return <p>loading</p>;
  const genreList = data?.genres.map((genre) => genre.name);
  const directorList = directors.map((director) => director.name);
  const year = data && new Date(data.release_date).getFullYear();
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
        <ViewShowInfoSection
          movieFullDetails={data}
          genreList={genreList}
          directorList={directorList}
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
            {recommendations.map((movie: Movie) => (
              <li className="min-w-48" key={movie.id}>
                <ShowCard
                  path={"/movie/" + movie.id}
                  genre_ids={movie.genre_ids}
                  vote_average={movie.vote_average}
                  name={movie.title}
                  image_path={movie.poster_path}
                />
              </li>
            ))}
          </ScrollableSection>
        )}
      </main>
    </>
  );
}

{
  /* <ScrollableItem
  path={"/movie/" + movie.id}
  lastItem={index + 1 === recommendations.length}
  key={movie.id}
  image_path={movie.poster_path}
  title={movie.title}
/> */
}
