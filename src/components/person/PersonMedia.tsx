import DynamicMediaTabs from "../DynamicMediaTabs";
import { useQuery } from "@tanstack/react-query";
import { getPersonImages, getPersonTaggedImages } from "@/api/credits.service";
import LoadingAnimation from "../LoadingAnimation";

type Props = {
  id: number;
  name: string;
};

export default function PersonMedia({ id, name }: Props) {
  const {
    data: tagged_images,
    isLoading: tagged_images_isLoading,
    error: tagged_images_error,
  } = useQuery({
    queryKey: ["tagged_images", id],
    queryFn: getPersonTaggedImages,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: images,
    isLoading: images_isLoading,
    error: images_error,
  } = useQuery({
    queryKey: ["images", id],
    queryFn: getPersonImages,
    staleTime: 1000 * 60 * 5,
  });

  if (tagged_images_isLoading || images_isLoading) return <LoadingAnimation />;
  if (tagged_images_error || images_error)
    return <p>There was a server error. Please try again later.</p>;

  return (
    images &&
    tagged_images && (
      <DynamicMediaTabs
        tabs={[
          { images: images, tab_title: "Images" },
          { images: tagged_images, tab_title: "Tagged Images" },
        ]}
        view_all_link={`/media/person/${id}/${name}`}
      />
    )
  );
}
