import Socials from "./Socials";
import PersonalInfo from "./PersonalInfo";
import { PersonFullInfo } from "@/types/credits";

type Props = { person: PersonFullInfo };

export default function SocialAndPersonalInfo({ person }: Props) {
  return (
    <div className="px-2 py-4 max-sm:px-0 ">
      <PersonalInfo person={person} />
      <Socials className="mt-4" person_id={person.id} />
    </div>
  );
}
