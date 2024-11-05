import { searchPerson } from "@/api/show.service";
import { LanguageCode } from "@/types/language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getImg } from "@/lib/helpers";
import LoadingAnimation from "../LoadingAnimation";

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

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p>There was a server error. Please try again later.</p>;

  return (
    <>
      {data && data.length === 0 && <p>No result found</p>}
      <ol className="flex flex-col gap-2">
        {data?.map((person) => (
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
