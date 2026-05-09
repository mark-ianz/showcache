import DynamicMediaTabs from "../DynamicMediaTabs";
import { getShowImages } from "@/api/show.service";
import { useQuery } from "@tanstack/react-query";
import { getShowType } from "@/lib/helpers";
import { ShowFullDetails } from "@/types/show";
import { Skeleton } from "../ui/skeleton";
import ErrorComponent from "../ErrorComponent";

type Props = {
  show_data: ShowFullDetails;
  show_title: string;
};

export default function ShowMedia({ show_data, show_title }: Props) {
  const type = getShowType(show_data);

  const { data, error, isLoading } = useQuery({
    queryKey: ["show_media", show_data.id, type],
    queryFn: getShowImages,
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <ErrorComponent error={error} />;
  if (isLoading) return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );


  return (
    data && (
      <DynamicMediaTabs
        tabs={[
          { images: data.backdrops, tab_title: "Backdrops" },
          { images: data.posters, tab_title: "Posters" },
        ]}
        view_all_link={`/media/${type}/${show_data.id}/${show_title}`}
      />
    )
  );
}
