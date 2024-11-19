import { getCollectionImages } from "@/api/movies.service";
import { useQuery } from "@tanstack/react-query";
import DynamicMediaTabs from "../DynamicMediaTabs";

type Props = { id: number; collectionName: string };

export default function CollectionMedia({ id, collectionName }: Props) {
  const { data: images } = useQuery({
    queryKey: ["collection_media", id],
    queryFn: getCollectionImages,
    staleTime: 1000 * 60 * 5,
  });

  return (
    images && (
      <DynamicMediaTabs
        tabs={[
          { images: images.backdrops, tab_title: "Backdrops" },
          { images: images.posters, tab_title: "Posters" },
        ]}
        view_all_link={`/media/collection/${id}/${collectionName}`}
      />
    )
  );
}
