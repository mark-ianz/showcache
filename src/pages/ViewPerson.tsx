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
      <section className="p-6 relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
        <div className="relative z-10 items-center">
          <div className="flex gap-8 max-md:flex-col items-start">
            <div className="min-w-80 flex flex-col">
              <div>
                <AspectRatio ratio={2 / 3}>
                  <img
                    src={getImg(person.profile_path, "w780")}
                    alt={"Image of " + person.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </AspectRatio>
              </div>
              <div className="p-4">
                <Socials className="mb-4" person_id={person.id} />
                <PersonalInfo person={person} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <HeaderText>{person.name}</HeaderText>
              <Biography biography={biography} person={person.name} />
            </div>
          </div>
        </div>
      </section>
    </ViewShowLayout>
  );
}
