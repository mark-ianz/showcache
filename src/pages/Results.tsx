import { useLanguage } from "@/context/language-provider";
import ListMainWrapper from "@/components/ListMainWrapper";
import ShowSection from "@/components/show/ShowSection";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchResult } from "@/api/show.service";
import HeaderText from "@/components/HeaderText";
import { useQuery } from "@tanstack/react-query";
import { PersonSearch } from "@/types/credits";
import { Movie, TV } from "@/types/show";
import { getImg } from "@/lib/helpers";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function Results() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const searchFor = searchParams.get("searchFor");

  const { data, error, isLoading } = useQuery({
    queryKey: ["results", language, query, searchFor],
    queryFn: getSearchResult,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p>There was a server error. Please try again later.</p>;

  return (
    <ListMainWrapper>
      {searchFor === "person" ? (
        <section>
          <HeaderText className="font-normal mb-2 text-2xl max-md:text-xl">
            Search Results
          </HeaderText>
          <ol className="flex flex-col gap-2">
            {(data as PersonSearch[])?.map((person) => (
              <li key={person.id}>
                <Link to={`/person/${person.id}`} className="flex">
                  <div className="w-32 h-32 aspect-square">
                    <img
                      src={getImg(person.profile_path, "w300", false)}
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
        </section>
      ) : (
        <ShowSection
          showArray={data as Movie[] | TV[]}
          error={error}
          loading={isLoading}
          title="Search Results"
          isTv={searchFor === "tv"}
        />
      )}
    </ListMainWrapper>
  );
}
