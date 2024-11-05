import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import { useSearchParams } from "react-router-dom";
import HeaderText from "@/components/HeaderText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { search_categories } from "@/lib/constants";
import PersonContent from "@/components/results/PersonContent";
import ShowContent from "@/components/results/ShowContent";
import CollectionsContent from "@/components/results/CollectionsContent";

export default function Results() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const [openedTab, setOpenedTab] = useState<string>("person");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "t";

  return (
    <ListMainWrapper>
      <div>
        <HeaderText className="font-normal mb-2 text-2xl max-md:text-xl">
          Search Results
        </HeaderText>
        <Tabs value={openedTab} onValueChange={setOpenedTab}>
          <TabsList className="bg-background flex justify-start gap-3">
            {search_categories.map(({ value, name }, index) => (
              <TabsTrigger value={value} asChild key={index + value}>
                <Button
                  variant={"ghost"}
                  className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0"
                >
                  {name}
                </Button>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="person">
            <PersonContent query={query} language={language} />
          </TabsContent>
          <TabsContent value="movie">
            <ShowContent query={query} language={language} searchFor="movie" />
          </TabsContent>
          <TabsContent value="tv">
            <ShowContent query={query} language={language} searchFor="tv" />
          </TabsContent>
          <TabsContent value="collection">
            <CollectionsContent query={query} language={language}/>
          </TabsContent>
        </Tabs>
      </div>
    </ListMainWrapper>
  );
}
