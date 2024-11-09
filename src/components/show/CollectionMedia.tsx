import { getCollectionImages } from "@/api/movies.service";
import { useQuery } from "@tanstack/react-query";
import DynamicMediaTabs from "../DynamicMediaTabs";

type Props = { id: number };

export default function CollectionMedia({ id }: Props) {
  const { data } = useQuery({
    queryKey: ["collection_media", id],
    queryFn: getCollectionImages,
    staleTime: 1000 * 60 * 5,
  });

  return (
    data && (
      <DynamicMediaTabs
        tabs={[
          { images: data.backdrops, tab_title: "Backdrops" },
          { images: data.posters, tab_title: "Posters" },
        ]}
        view_all_link={`/collection/${id}/media`}
      />
    )
  );
}
