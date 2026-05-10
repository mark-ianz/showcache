import { useEffect } from "react";
import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import { useInfiniteShows } from "@/hooks/useShows";
import { getPopularPeople } from "@/api/credits.service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Link } from "react-router-dom";
import { getImg } from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderText from "@/components/HeaderText";

export default function PeoplePage() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { 
    data, 
    error, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteShows({
    queryKey: ["popular_people", language],
    queryFn: getPopularPeople as any,
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <ListMainWrapper>
      <div className="space-y-8">
        <div>
          <HeaderText className="text-4xl font-bold tracking-tight mb-2">People</HeaderText>
          <p className="text-muted-foreground text-lg">Discover the most popular people in the movie and TV industry.</p>
        </div>

        {error && <p className="text-destructive">Error loading people.</p>}

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.map((person: any) => (
            <li key={person.id} className="group">
              <Link to={`/person/${person.id}`} className="block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
                  <img
                    src={getImg({
                      path: person.profile_path,
                      size: "w500",
                      mediaType: "person",
                    })}
                    alt={person.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                     <p className="text-white font-semibold text-lg">{person.name}</p>
                     <p className="text-white/70 text-sm">{person.known_for_department}</p>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.known_for_department}</p>
                </div>
              </Link>
            </li>
          ))}

          {isLoading && !data && (
            Array.from({ length: 15 }).map((_, i) => (
              <li key={i} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </li>
            ))
          )}

          {isFetchingNextPage && (
            Array.from({ length: 10 }).map((_, i) => (
              <li key={i} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </li>
            ))
          )}
        </ul>

        <div ref={targetRef} className="h-10 w-full" />
      </div>
    </ListMainWrapper>
  );
}
