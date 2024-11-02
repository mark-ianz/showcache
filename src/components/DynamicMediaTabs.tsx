import { getImg } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderText from "@/components/HeaderText";
import { Button } from "@/components/ui/button";
import ScrollableSection from "./ScrollableSection";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TabImage } from "@/types/images";

type Props = {
  tabs: {
    images: TabImage[];
    tab_title: string;
  }[];
  view_all_link: string;
};

export default function DynamicMediaTabs({ tabs, view_all_link }: Props) {
  const [openedTab, setOpenedTab] = useState<string>(tabs[0].tab_title || "");

  const sortedImagesTab = tabs.map((tab) => ({
    ...tab,
    images: tab.images.sort((a, b) => b.vote_count - a.vote_count),
  }));

  const slicedImagesTab = sortedImagesTab.map((tab) => ({
    ...tab,
    images: tab.images.slice(0, 14),
  }));

  const isAllImagesEmpty = slicedImagesTab.every(
    (tab) => tab.images.length === 0
  );
  const isFewImages = slicedImagesTab.every((tab) => tab.images.length < 14);
  return (
    !isAllImagesEmpty && (
      <div>
        <Tabs value={openedTab} onValueChange={(value) => setOpenedTab(value)}>
          <div className="flex flex-col items-start">
            <HeaderText>Media</HeaderText>
            <TabsList className="flex items-start justify-start p-0 h-auto gap-4 bg-background">
              {tabs.map(
                (tab, index) =>
                  tab.images.length > 0 && (
                    <TabsTrigger
                      value={tab.tab_title}
                      asChild
                      key={index + tab.tab_title}
                    >
                      <Button
                        variant={"ghost"}
                        className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                      >
                        {tab.tab_title}
                      </Button>
                    </TabsTrigger>
                  )
              )}
              {!isFewImages && (
                <Button
                  asChild
                  variant={"ghost"}
                  className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                >
                  <Link to={view_all_link}>View All Media</Link>
                </Button>
              )}
            </TabsList>
          </div>
          {slicedImagesTab.map((tab, index) => (
            <TabsContent value={tab.tab_title} key={index}>
              <ScrollableSection olClassName="gap-1">
                {tab.images.map((image, index) => (
                  <li
                    key={image.file_path + index}
                    className={cn(
                      index + 1 === tab.images.length && "z-10",
                      "w-60 max-xl:w-52 max-lg:w-44 max-md:w-36 max-sm:w-28",
                      tab.tab_title === "Backdrops" &&
                        "w-[500px] max-xl:w-[400px] max-md:w-[300px] max-sm:w-[250px]"
                    )}
                  >
                    <img
                      src={getImg({path: image.file_path, size: "w780", mediaType: "show"})}
                      className={cn("w-full h-full object-cover object-center")}
                    />
                  </li>
                ))}
              </ScrollableSection>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  );
}
