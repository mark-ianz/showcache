import { getPersonImages } from "@/api/credits.service";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingAnimation from "@/components/LoadingAnimation";
import ListContainer from "@/components/view_all_media/ListContainer";
import MediaListContainer from "@/components/view_all_media/MediaListContainer";
import TitleAndOptions from "@/components/view_all_media/TitleAndOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ViewPersonMedia() {
  const { id, name } = useParams();

  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["person_media", id],
    queryFn: getPersonImages,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorComponent error={error} />;

  return (
    images && (
      <main className="w-full">
        <TitleAndOptions title={name!} />
        <ListContainer>
          <MediaListContainer
            image={images}
            title="Profiles"
            mediaListClassName="grid-cols-6 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2"
          />
        </ListContainer>
      </main>
    )
  );
}
