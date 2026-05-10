import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import { useSearchParams } from "react-router-dom";
import HeaderText from "@/components/HeaderText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { search_categories } from "@/lib/constants";
import PersonContent from "@/components/results/PersonContent";
import ShowContent from "@/components/results/ShowContent";
import CollectionsContent from "@/components/results/CollectionsContent";
import { useQuery, useQueries } from "@tanstack/react-query";
import { searchMulti, searchPerson, searchShow } from "@/api/show.service";
import { searchCollection } from "@/api/movies.service";
import { Skeleton } from "@/components/ui/skeleton";
import ShowListWrapper from "@/components/show/ShowListWrapper";
import ShowCardSkeleton from "@/components/show/ShowCardSkeleton";
import { cn } from "@/lib/utils";

export default function Results() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "t";

  const [openedTab, setOpenedTab] = useState<string>("movie");

  const { data: multiResults, isPending } = useQuery({
    queryKey: ["multi_search_results", language, query],
    queryFn: searchMulti,
    staleTime: 1000 * 60 * 60,
  });

  const resultsQueries = useQueries({
    queries: [
      {
        queryKey: ["person_search_results", language, query],
        queryFn: searchPerson,
        staleTime: 1000 * 60 * 60 * 24,
      },
      {
        queryKey: ["show_search_results", language, query, "movie"],
        queryFn: searchShow,
        staleTime: 1000 * 60 * 60 * 24,
      },
      {
        queryKey: ["show_search_results", language, query, "tv"],
        queryFn: searchShow,
        staleTime: 1000 * 60 * 60 * 24,
      },
      {
        queryKey: ["collection_search_results", language, query],
        queryFn: searchCollection,
        staleTime: 1000 * 60 * 60 * 24,
      },
    ],
  });

  const categoryCounts: Record<string, number> = {
    person: resultsQueries[0].data?.total_results || 0,
    movie: resultsQueries[1].data?.total_results || 0,
    tv: resultsQueries[2].data?.total_results || 0,
    collection: resultsQueries[3].data?.total_results || 0,
  };

  const isAllLoading = isPending || resultsQueries.some((q) => q.isPending);

  const sortedCategories = useMemo(() => {
    if (!multiResults?.results?.length) return search_categories;

    const typesOrder = multiResults.results.reduce((acc: string[], curr) => {
      if (curr.media_type && !acc.includes(curr.media_type)) {
        acc.push(curr.media_type);
      }
      return acc;
    }, []);

    return [...search_categories].sort((a, b) => {
      const indexA = typesOrder.indexOf(a.value);
      const indexB = typesOrder.indexOf(b.value);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
  }, [multiResults]);

  useEffect(() => {
    if (multiResults?.results && multiResults.results.length > 0) {
      const firstType = multiResults.results[0].media_type;
      if (firstType) {
        setOpenedTab(firstType);
      }
    }
  }, [multiResults, query]);

  if (isAllLoading) {
    return (
      <ListMainWrapper>
        <div>
          <HeaderText className="font-normal mb-2 text-2xl max-md:text-xl">
            Search Results
          </HeaderText>
          <div className="flex gap-4 mb-6 mt-4">
             <Skeleton className="h-9 w-24 rounded-md" />
             <Skeleton className="h-9 w-24 rounded-md" />
             <Skeleton className="h-9 w-24 rounded-md" />
             <Skeleton className="h-9 w-24 rounded-md" />
          </div>
          <ShowListWrapper>
            {Array.from({ length: 12 }).map((_, i) => (
              <li key={i}>
                <ShowCardSkeleton />
              </li>
            ))}
          </ShowListWrapper>
        </div>
      </ListMainWrapper>
    );
  }

  return (
    <ListMainWrapper>
      <div>
        <HeaderText className="font-normal mb-2 text-2xl max-md:text-xl">
          Search Results
        </HeaderText>
        <Tabs value={openedTab} onValueChange={setOpenedTab}>
          <TabsList className="bg-background flex justify-start gap-3 overflow-x-auto no-scrollbar">
            {sortedCategories.map(({ value, name }, index) => (
              <TabsTrigger value={value} asChild key={index + value}>
                <Button
                  variant={"ghost"}
                  className="p-0 hover:bg-inherit text-muted-foreground focus-visible:ring-0 flex items-center gap-2"
                >
                  {name}
                  <span className={cn(
                    "text-[11px] px-1.5 py-0.5 rounded-md font-bold transition-all border",
                    openedTab === value 
                      ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                      : "bg-muted text-muted-foreground/80 border-border/50"
                  )}>
                    {categoryCounts[value] || 0}
                  </span>
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
