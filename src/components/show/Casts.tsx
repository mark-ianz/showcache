import ScrollableSection from "../ScrollableSection";
import { Cast, Crew } from "@/types/credits";
import ScrollableItem from "../ScrollableItem";
import { getCredits } from "@/api/credits.service";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { ShowType } from "@/types/show";
import { Skeleton } from "../ui/skeleton";
import ErrorComponent from "../ErrorComponent";

type Props = { id: string; type: ShowType };

export default function Casts({ id, type }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { data: credits, isLoading, error } = useQuery({
    queryKey: ["credits", type, language, id],
    queryFn: getCredits,
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <ErrorComponent error={error} />;
  if (isLoading || !credits) return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-20" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-32 flex-shrink-0" />
        ))}
      </div>
    </div>
  );

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
