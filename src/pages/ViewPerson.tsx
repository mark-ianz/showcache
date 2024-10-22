import { getPersonFullInfo } from "@/api/credits.service";
import HeaderText from "@/components/HeaderText";
import NameAndBio from "@/components/person/NameAndBio";
import PersonPortrait from "@/components/person/PersonPortrait";
import SocialAndPersonalInfo from "@/components/person/SocialAndPersonalInfo";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// combined credits endpoint: Combined movie and TV credits that belong to a person.
// external_ids endpoint: The external ID's that belong to a person such as social ids.
// images endpoint: Get the profile images that belong to a person.
// tagged_images endpoint: Get the tagged images that belong to a person for example their image from this movie or tv.

type Props = {};

export default function ViewPerson({}: Props) {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { data: person, isLoading } = useQuery({
    queryKey: ["person", language, id],
    queryFn: getPersonFullInfo,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || !person) return <p>Loading</p>;

  return (
    <main className="w-full">
      <div className="flex gap-8 max-xsm:flex-col items-start max-md:gap-6 max-sm:gap-4">
        <div className="flex flex-col max-xsm:w-full">
          <PersonPortrait
            name={person.name}
            profile_path={person.profile_path}
          />
          <HeaderText className="hidden max-xsm:block text-center mt-4">{person.name}</HeaderText>
          <SocialAndPersonalInfo person={person} />
        </div>
        <NameAndBio person={person} />
      </div>
    </main>
  );
}
