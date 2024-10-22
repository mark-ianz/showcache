import Socials from "./Socials";
import PersonalInfo from "./PersonalInfo";
import { PersonFullInfo } from "@/types/credits";

type Props = { person: PersonFullInfo };

export default function SocialAndPersonalInfo({ person }: Props) {
  return (
    <div className="px-2 py-4 max-sm:p-0 max-sm:py-6">
      <Socials className="mb-4" person_id={person.id} />
      <PersonalInfo person={person} />
    </div>
  );
}
