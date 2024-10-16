import { getImg } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderText from "@/components/HeaderText";
import { Button } from "@/components/ui/button";
import ScrollableSection from "./ScrollableSection";
import { useEffect, useState } from "react";
import { Image } from "@/types/images";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";
import { getImages } from "@/api/show.service";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type Tab = "Backdrops" | "Posters";

type TabContent = {
  images: Image[];
  value: Tab;
};

type NewProps = { showData: TvFullDetails | MovieFullDetails };

export default function MediaTabs({ showData }: NewProps) {
  const [openedTab, setOpenedTab] = useState<Tab>("Backdrops");
  const [tabs, setTabs] = useState<TabContent[]>([]);
  const type = "title" in showData ? "movie" : "tv";

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImages(showData.id, type);
      setTabs([
        { images: images.backdrops, value: "Backdrops" },
        { images: images.posters, value: "Posters" },
      ]);
    };

    fetchImages();
  }, [showData, type]);

  useEffect(() => {
    const tab = tabs.find((tab) => tab.images.length > 0);
    if (tab) {
      setOpenedTab(tab.value);
    }
  }, [tabs]);

  return (
    tabs.some((tab) => tab.images.length > 0) && (
      <section>
        <div>
          <Tabs
            value={openedTab}
            onValueChange={(value) => setOpenedTab(value as Tab)}
          >
            <div className="flex flex-col items-start">
              <HeaderText>Media</HeaderText>
              <TabsList className="flex items-start justify-start p-0 h-auto gap-4 bg-background">
                {tabs.map(
                  (tab, index) =>
                    tab.images.length > 0 && (
                      <TabsTrigger
                        value={tab.value}
                        asChild
                        key={index + tab.value}
                      >
                        <Button
                          variant={"ghost"}
                          className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                        >
                          {tab.value}
                        </Button>
                      </TabsTrigger>
                    )
                )}
                <Button
                  asChild
                  variant={"ghost"}
                  className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                >
                  <Link to={"#"}>View All Media</Link>
                </Button>
              </TabsList>
            </div>
            {tabs.map((tab, index) => (
              <TabsContent value={tab.value} key={index}>
                <ScrollableSection olClassName="gap-1">
                  {tab.images.slice(0, 14).map((backdrop, index) => (
                    <li
                      key={backdrop.file_path + index}
                      className={cn(
                        index + 1 === 14 && "z-10",
                        "w-[500px] max-xl:w-[400px] max-md:w-[300px] max-sm:w-[250px]",
                        tab.value === "Posters" && "w-60 max-xl:w-52 max-lg:w-44 max-md:w-36 max-sm:w-28"
                      )}
                    >
                      <AspectRatio ratio={backdrop.aspect_ratio}>
                        <img
                          src={getImg(backdrop.file_path, "w780")}
                          className={cn(
                            "w-full h-full object-cover object-center",
                          )}
                        />
                      </AspectRatio>
                    </li>
                  ))}
                </ScrollableSection>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    )
  );
}
