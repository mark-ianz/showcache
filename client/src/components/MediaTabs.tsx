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

  return (
    tabs && (
      <section>
        <div>
          <Tabs
            defaultValue={openedTab}
            onValueChange={(value) => setOpenedTab(value as Tab)}
          >
            <div className="flex flex-col items-start">
              <HeaderText className="mb-2">Media</HeaderText>
              <TabsList className="flex items-start justify-start p-0 h-auto gap-4 bg-background">
                <TabsTrigger value="Backdrops" asChild>
                  <Button
                    variant={"ghost"}
                    className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                  >
                    Backdrops
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="Posters" asChild>
                  <Button
                    variant={"ghost"}
                    className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                  >
                    Posters
                  </Button>
                </TabsTrigger>
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
                <ScrollableSection>
                  {tab.images.slice(0, 14).map((backdrop, index) => (
                    <li
                      key={backdrop.file_path + index}
                      className={cn(
                        "w-[500px]",
                        tab.value === "Posters" && "poster",
                        index + 1 === 14 && "z-10"
                      )}
                    >
                      <img
                        src={getImg(backdrop.file_path, "w780")}
                        className={cn(
                          "w-full object-cover h-[300px]",
                          tab.value === "Posters" && "poster"
                        )}
                      />
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
