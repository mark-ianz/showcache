import { getCombinedCredits } from "@/api/show.service";
import { useLanguage } from "@/context/language-provider";
import { getShowName, getShowType } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import ShowCard from "../show/ShowCard";
import ScrollableSection from "../ScrollableSection";
import { cn } from "@/lib/utils";
import HeaderText from "../HeaderText";

type Props = { id: number };

export default function KnownFor({ id }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data } = useQuery({
    queryKey: ["known_for", language, id],
    queryFn: getCombinedCredits,
    staleTime: 1000 * 60 * 5,
  });

  if (!data) return <p>loading</p>

  console.log(data);
  return (
    data?.length > 0 && (
      <>
        <HeaderText className="text-2xl max-md:text-xl">Known For</HeaderText>
        <ScrollableSection>
          {data?.map((show, index) => (
            <li
              key={show.id}
              className={cn(
                "w-48 max-lg:w-40 max-md:w-36 max-sm:w-32",
                index + 1 === data.length && "z-10"
              )}
            >
              <ShowCard
                genre_ids={show.genre_ids}
                image_path={show.poster_path}
                name={getShowName(show)}
                path={`/${getShowType(show)}/${show.id}`}
                vote_average={show.vote_average}
              />
            </li>
          ))}
        </ScrollableSection>
      </>
    )
  );
}
