import ScrollableSection from "../ScrollableSection";
import { Cast, Crew } from "@/types/credits";
import ScrollableItem from "../ScrollableItem";
import { getCredits } from "@/api/credits.service";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { ShowType } from "@/types/show";

type Props = { id: string; type: ShowType };

export default function Casts({ id, type }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { data: credits } = useQuery({
    queryKey: ["credits", type, language, id],
    queryFn: getCredits,
    staleTime: 1000 * 60 * 5,
  });

  if (!credits) return <p>loading</p>;
  const scrollItems: (Cast | Crew)[] =
    credits.cast.length > 14
      ? credits.cast.slice(0, 14)
      : [...credits.cast, ...credits.crew.slice(0, 14 - credits.cast.length)];

  return (
    scrollItems.length > 0 && (
      <ScrollableSection title="Cast">
        {scrollItems.map((person: Cast | Crew, index: number) => (
          <ScrollableItem
            mediaType="person"
            path={"/person/" + person.id}
            lastItem={index + 1 === scrollItems.length}
            key={`${person.id}-${
              "character" in person ? person.character : person.job
            }-${index}`}
            image_path={person.profile_path}
            title={person.name}
            subtext={"character" in person ? person.character : person.job} // Type narrowing
          />
        ))}
      </ScrollableSection>
    )
  );
}
