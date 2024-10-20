import { getPersonFullInfo } from "@/api/credits.service";
import HeaderText from "@/components/HeaderText";
import PersonalInfo from "@/components/person/PersonalInfo";
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
  const { data: person } = useQuery({
    queryKey: ["person", language, id],
    queryFn: getPersonFullInfo,
    staleTime: 1000 * 60 * 5,
  });

  const biography = person?.biography.split("\n").filter((p) => p);
  console.log(biography);

  if (!person) return <p>Loading</p>;
  console.log(person);

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
              <PersonalInfo person={person} />
            </div>
            <div className="flex flex-col gap-4">
              <HeaderText>{person.name}</HeaderText>
              <div className="max-md:text-sm">
                <p className="text-xl font-semibold mb-2">Biography</p>
                <div className="flex flex-col gap-2 text-muted-foreground">
                  {biography && biography.length > 0
                    ? biography?.map((bio, index) => (
                        <p key={index + bio.length}>{bio}</p>
                      ))
                    : "No biography of " + person.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ViewShowLayout>
  );
}
