import { getPersonFullInfo } from "@/api/credits.service";
import ErrorComponent from "@/components/ErrorComponent";
import HeaderText from "@/components/HeaderText";
import LoadingAnimation from "@/components/LoadingAnimation";
import KnownFor from "@/components/person/KnownFor";
import NameAndBio from "@/components/person/NameAndBio";
import PersonMedia from "@/components/person/PersonMedia";
import PersonPortrait from "@/components/person/PersonPortrait";
import SocialAndPersonalInfo from "@/components/person/SocialAndPersonalInfo";
import ViewImage from "@/components/ViewImage";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

  if (isLoading) return <LoadingAnimation />;
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
          <PersonMedia id={person.id} />
        </div>
      </div>
    )
  );
}
