import {
  getCollectionDetails,
  getMovieFullDetails,
} from "@/api/movies.service";
import ErrorComponent from "@/components/ErrorComponent";
import HeaderText from "@/components/HeaderText";
import LoadingAnimation from "@/components/LoadingAnimation";
import ScrollableSection from "@/components/ScrollableSection";
import CollectionMedia from "@/components/show/CollectionMedia";
import Overview from "@/components/show/InfoSection/Overview";
import ShowPoster from "@/components/show/InfoSection/ShowPoster";
import SectionwBGImage from "@/components/show/SectionwBGImage";
import ShowCard from "@/components/show/ShowCard";
import ViewImage from "@/components/ViewImage";
import { useLanguage } from "@/context/language-provider";
import { useCurrencyRates } from "@/hooks/useCurrency";
import { formatCurrency, getGenre, mergeGenreIds } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { CollectionDetails } from "@/types/movie.details";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function Genres({
  collection,
}: {
  collection: CollectionDetails;
}): JSX.Element {
  const genre_ids = mergeGenreIds(collection.parts);
  const genres = getGenre(genre_ids);
  return <p>{genres.join(" / ")}</p>;
}

export default function ViewCollection() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const { data: rates } = useCurrencyRates();

  const {
    data: collection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection_details", language, id],
    queryFn: getCollectionDetails,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useQuery({
    queryKey: ["collection_movies", language, id],
    queryFn: async ({ signal }) => {
      const movies = await Promise.all(
        collection!.parts.map(async (movie) => {
          const movieData = await getMovieFullDetails({
            queryKey: ["movie_details", language, movie.id],
            meta: { id: movie.id },
            signal,
          });
          return movieData;
        })
      );

      return movies;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!collection,
  });

  if (isLoading || isLoadingMovies) return <LoadingAnimation />;

  if (error || errorMovies)
    return <ErrorComponent error={error || errorMovies} />;
  if (!collection || !movies) return null;

  const budget = movies.reduce((acc, movie) => acc + movie.budget, 0);
  const revenue = movies.reduce((acc, movie) => acc + movie.revenue, 0);

  return (
    <div className="flex w-full flex-col gap-10">
      {collection && movies && (
        <>
          <SectionwBGImage backdrop_path={collection.backdrop_path}>
            <div className="relative z-10 flex gap-4 max-md:flex-col items-center">
              <ViewImage src={collection.poster_path}>
                <ShowPoster poster_path={collection.poster_path} />
              </ViewImage>
              <div className="flex flex-col justify-center gap-2">
                <div>
                  <HeaderText>{collection.name}</HeaderText>
                  <Genres collection={collection} />
                </div>
                <Overview overview={collection.overview} />
                <div>
                  <p>Budget: {formatCurrency(budget, language, rates)}</p>
                  <p>Revenue: {formatCurrency(revenue, language, rates)}</p>
                  <p>Number of Movies: {movies.length}</p>
                </div>
              </div>
            </div>
          </SectionwBGImage>
          <ScrollableSection title="Collection Movies">
            {movies.map((movie, index) => (
              <li
                className={cn(
                  "w-48 max-lg:w-40 max-md:w-36 max-sm:w-32",
                  index + 1 === movies.length && "z-10"
                )}
                key={movie.id}
              >
                <ShowCard
                  genre_ids={movie.genres.map((genre) => genre.id)}
                  image_path={movie.poster_path}
                  name={movie.title}
                  path={`/movie/${movie.id}`}
                  vote_average={movie.vote_average}
                />
              </li>
            ))}
          </ScrollableSection>
          <CollectionMedia id={collection.id} collectionName={collection.name} />
        </>
      )}
    </div>
  );
}
