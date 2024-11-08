import { getCollectionDetails } from "@/api/movies.service";
import HeaderText from "@/components/HeaderText";
import ListMainWrapper from "@/components/ListMainWrapper";
import LoadingAnimation from "@/components/LoadingAnimation";
import ShowPoster from "@/components/show/InfoSection/ShowPoster";
import SectionwBGImage from "@/components/show/SectionwBGImage";
import { useLanguage } from "@/context/language-provider";
import { getGenre, mergeGenreIds } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ViewCollection() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const {
    data: collection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection_details", language, id],
    queryFn: getCollectionDetails,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p>There was a server error. Please try again later.</p>;
  if (!collection) return null;

  const genre_ids = mergeGenreIds(collection.parts);
  const genres = getGenre(genre_ids);
  console.log(genres);
  return (
    collection && (
      <ListMainWrapper>
        <SectionwBGImage backdrop_path={collection.backdrop_path}>
          <div className="relative z-10 flex gap-4">
            <ShowPoster poster_path={collection.poster_path} />
            <div>
              <HeaderText>{collection.name}</HeaderText>
              <p>{genres.join(" / ")}</p>
              <p>{collection.overview}</p>
            </div>
          </div>
        </SectionwBGImage>
      </ListMainWrapper>
    )
  );
}
