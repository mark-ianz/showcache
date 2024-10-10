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
console.log(credits)
  const scrollItems: (Cast | Crew)[] =
    credits.cast.length > 14
      ? credits.cast.slice(0, 14)
      : [...credits.cast, ...credits.crew.slice(0, 14 - credits.cast.length)];
  return (
    <ScrollableSection title="Cast">
      {scrollItems.map((credit: Cast | Crew, index: number) => (
        <ScrollableItem
          path={"/person/" + credits.id}
          lastItem={index + 1 === scrollItems.length}
          key={`${credit.id}-${
            "character" in credit ? credit.character : credit.job
          }-${index}`}
          image_path={credit.profile_path}
          title={credit.name}
          subtext={"character" in credit ? credit.character : credit.job} // Type narrowing
        />
      ))}
    </ScrollableSection>
  );
}
