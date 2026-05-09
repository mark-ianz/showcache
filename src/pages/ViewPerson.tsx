import { getPersonFullInfo } from "@/api/credits.service";
import ErrorComponent from "@/components/ErrorComponent";
import HeaderText from "@/components/HeaderText";
import KnownFor from "@/components/person/KnownFor";
import NameAndBio from "@/components/person/NameAndBio";
import PersonMedia from "@/components/person/PersonMedia";
import PersonPortrait from "@/components/person/PersonPortrait";
import SocialAndPersonalInfo from "@/components/person/SocialAndPersonalInfo";
import ViewImage from "@/components/ViewImage";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";

export default function ViewPerson() {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const {
    data: person,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["person", language, id],
    queryFn: getPersonFullInfo,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return (
    <div className="w-full relative flex gap-8 max-sm:flex-col">
      <div className="flex flex-col w-72 max-sm:w-full space-y-4">
        <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <div className="flex-1 space-y-6">
        <Skeleton className="h-12 w-1/2" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-32 flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <ErrorComponent error={error} />;

  return (
    person && (
      <div className="w-full relative flex gap-8 max-sm:flex-col max-md:gap-6 max-sm:gap-4">
        <div className="flex flex-col max-sm:w-full">
          <ViewImage src={person.profile_path}>
            <PersonPortrait
              name={person.name}
              profile_path={person.profile_path}
            />
          </ViewImage>
          <HeaderText className="hidden max-sm:block text-center mt-4">
            {person.name}
          </HeaderText>
          <SocialAndPersonalInfo person={person} />
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          <NameAndBio person={person} />
          <KnownFor id={person.id} />
          <PersonMedia id={person.id} name={person.name}/>
        </div>
      </div>
    )
  );
}
