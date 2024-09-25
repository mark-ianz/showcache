import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { getImg } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderText from "@/components/HeaderText";
import { Button } from "@/components/ui/button";
import ScrollableSection from "./ScrollableSection";
import { useId, useState } from "react";
import { Image } from "@/types/images";

type Props = { tabs: TabContent[] };
type Tab = "Backdrops" | "Posters";

type TabContent = {
  images: Image[];
  value: Tab;
};

export default function MediaTabs({ tabs }: Props) {
  const [tab, setTab] = useState<Tab>("Backdrops");
  return (
    <section>
      <div className="relative">
        <Tabs
          defaultValue={tab}
          onValueChange={(value) => setTab(value as Tab)}
        >
          <div className="flex flex-col items-start">
            <HeaderText className="mb-2">Media</HeaderText>
            <TabsList className="flex items-start justify-start p-0 h-auto gap-4 bg-background">
              <TabsTrigger value="Backdrops" asChild>
                <Button
                  variant={"ghost"}
                  className="p-0 hover:bg-inherit text-muted-foreground"
                >
                  Backdrops
                </Button>
              </TabsTrigger>
              <TabsTrigger value="Posters" asChild>
                <Button
                  variant={"ghost"}
                  className="p-0 hover:bg-inherit text-muted-foreground"
                >
                  Posters
                </Button>
              </TabsTrigger>
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent value={tab.value} key={useId()}>
              <ScrollableSection
                viewMore={tab.images.length >= 14}
                viewMoreLink="#"
              >
                {tab.images.slice(0, 14).map((backdrop, index) => (
                  <li
                    key={backdrop.file_path + index}
                    className={`w-[500px] ${
                      tab.value === "Posters" && "poster"
                    }`}
                  >
                    <img
                      src={getImg(backdrop.file_path, "w780")}
                      className={`w-full object-cover h-[300px] ${
                        tab.value === "Posters" && "poster"
                      }`}
                    />
                  </li>
                ))}
              </ScrollableSection>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
