import HeaderText from "../HeaderText";
import Biography from "./Biography";
import { PersonFullInfo } from "@/types/credits";

type Props = { person: PersonFullInfo };

export default function NameAndBio({ person }: Props) {
  const biography = person?.biography.split("\n").filter((p) => p);

  return (
    <div className="flex flex-col gap-4 w-full">
      <HeaderText className="max-xsm:hidden">{person.name}</HeaderText>
      <Biography biography={biography} person={person.name} />
    </div>
  );
}
