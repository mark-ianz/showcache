import { getPersonImages } from "@/api/credits.service";
import ErrorComponent from "@/components/ErrorComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TitleAndOptions from "@/components/view_all_media/TitleAndOptions";
import ListContainer from "@/components/view_all_media/ListContainer";
import MediaListContainer from "@/components/view_all_media/MediaListContainer";

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

  if (isLoading) return (
    <main className="w-full space-y-8">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-full rounded-xl" />
        ))}
      </div>
    </main>
  );

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
