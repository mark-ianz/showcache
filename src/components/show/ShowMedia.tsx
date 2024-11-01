import DynamicMediaTabs from "../DynamicMediaTabs";
import { getShowImages } from "@/api/show.service";
import { useQuery } from "@tanstack/react-query";
import { getShowType } from "@/lib/helpers";
import { ShowFullDetails } from "@/types/show";

type Props = {
  show_data: ShowFullDetails;
};

export default function ShowMedia({ show_data }: Props) {
  const type = getShowType(show_data);

  const { data } = useQuery({
    queryKey: ["show_media", show_data.id, type],
    queryFn: getShowImages,
    staleTime: 1000 * 60 * 5,
  });

  if (!data) return <p>loading</p>;

  return (
    <DynamicMediaTabs
      tabs={[
        { images: data?.backdrops, tab_title: "Backdrops" },
        { images: data?.posters, tab_title: "Posters" },
      ]}
      view_all_link={`/show/${show_data.id}/media`}
    />
  );
}
