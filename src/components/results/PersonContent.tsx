import { searchPerson } from "@/api/show.service";
import { LanguageCode } from "@/types/language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getImg } from "@/lib/helpers";
import { Skeleton } from "../ui/skeleton";
import ErrorComponent from "../ErrorComponent";

type Props = {
  query: string;
  language: LanguageCode;
};

export default function PersonContent({ query, language }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["person_search_results", language, query],
    queryFn: searchPerson,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const persons = data?.results;

  if (error) return <ErrorComponent error={error as Error} />;
  if (isLoading) return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="w-32 h-32 aspect-square rounded-md" />
          <div className="flex-1 space-y-2 py-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );


  return (
    <>
      {persons && persons.length === 0 && <p>No result found</p>}
      <ol className="flex flex-col gap-2">
        {persons?.map((person) => (
          <li key={person.id}>
            <Link to={`/person/${person.id}`} className="flex">
              <div className="w-32 h-32 aspect-square">
                <img
                  src={getImg({
                    path: person.profile_path,
                    size: "w300",
                    mediaType: "person",
                  })}
                  alt={person.name}
                  className="object-cover object-center w-full h-full rounded-md"
                />
              </div>
              <div className="pl-2 max-md:text-sm">
                <p className="font-semibold">{person.name}</p>
                <div className="flex mt-1">
                  <p>
                    <span>{person.known_for_department}</span>
                    <span> • </span>
                    <span className="font-thin text-muted-foreground">
                      {person.known_for.map((show, index) => (
                        <span key={show.id}>
                          {show.title || show.name}
                          {person.known_for.length - 1 !== index && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
