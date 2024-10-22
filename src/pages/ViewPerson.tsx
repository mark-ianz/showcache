import { getPersonFullInfo } from "@/api/credits.service";
import HeaderText from "@/components/HeaderText";
import Biography from "@/components/person/Biography";
import PersonalInfo from "@/components/person/PersonalInfo";
import Socials from "@/components/person/Socials";
import ViewShowLayout from "@/components/show/ViewShowLayout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/context/language-provider";
import { getImg } from "@/lib/helpers";
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

  const biography = person?.biography.split("\n").filter((p) => p);

  if (isLoading || !person) return <p>Loading</p>;

  return (
    <ViewShowLayout>
      <section className="relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
        <div className="relative z-10 items-center">
          <div className="flex gap-8 max-xsm:flex-col items-start max-md:gap-6 max-sm:gap-4">
            <div className="flex flex-col max-xsm:w-full">
              <div className="w-64 max-md:w-52 max-xsm:self-center">
                <AspectRatio ratio={2 / 3}>
                  <img
                    src={getImg(person.profile_path, "w780")}
                    alt={"Image of " + person.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </AspectRatio>
              </div>

              <div className="px-2 py-4 max-sm:p-0 max-sm:py-6">
                <Socials className="mb-4" person_id={person.id} />
                <PersonalInfo person={person} />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <HeaderText>{person.name}</HeaderText>
              <Biography biography={biography} person={person.name} />
            </div>
          </div>
        </div>
      </section>
    </ViewShowLayout>
  );
}
