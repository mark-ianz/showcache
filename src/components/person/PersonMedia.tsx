import DynamicMediaTabs from "../DynamicMediaTabs";
import { useQuery } from "@tanstack/react-query";
import { getPersonImages, getPersonTaggedImages } from "@/api/credits.service";

type Props = {
  id: number;
};

export default function PersonMedia({ id }: Props) {
  const { data: tagged_images } = useQuery({
    queryKey: ["tagged_images", id],
    queryFn: getPersonTaggedImages,
    staleTime: 1000 * 60 * 5,
  });

  const { data: images } = useQuery({
    queryKey: ["images", id],
    queryFn: getPersonImages,
    staleTime: 1000 * 60 * 5,
  });

  if (!tagged_images || !images) return <p>loading</p>;
  
  return (
    <DynamicMediaTabs
      tabs={[
        { images: images, tab_title: "Images" },
        { images: tagged_images, tab_title: "Tagged Images" },
      ]}
    />
  );
}
