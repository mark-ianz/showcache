import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { Link, useSearchParams } from "react-router-dom";
import HeaderText from "@/components/HeaderText";
import { useQuery } from "@tanstack/react-query";
import { PersonSearch } from "@/types/credits";
import { Movie, TV } from "@/types/show";
import { getImg } from "@/lib/helpers";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { search_categories } from "@/lib/constants";
import PersonContent from "@/components/results/PersonContent";
import ShowContent from "@/components/results/ShowContent";

export default function Results() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const [openedTab, setOpenedTab] = useState<string>("person");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "t";
  /* 
  const { data, error, isLoading } = useQuery({
    queryKey: ["results", language, query, searchFor],
    queryFn: getSearchResult,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p>There was a server error. Please try again later.</p>; */

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
        </Tabs>
      </div>
    </ListMainWrapper>
  );
}
