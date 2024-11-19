import { getShowImages } from "@/api/show.service";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TitleAndOptions from "@/components/view_all_media/TitleAndOptions";
import ListContainer from "@/components/view_all_media/ListContainer";
import MediaListContainer from "@/components/view_all_media/MediaListContainer";

export default function ViewShowMedia() {
  const { type, id, title } = useParams();

  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["show_media", id, type],
    queryFn: getShowImages,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorComponent error={error} />;

  return (
    images && (
      <main className="w-full">
        <TitleAndOptions title={title!} />
        <ListContainer>
          <MediaListContainer image={images.backdrops} title="Backdrops"/>
          <MediaListContainer image={images.posters} title="Posters" />
        </ListContainer>
      </main>
    )
  );
}
