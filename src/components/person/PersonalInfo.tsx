import { formatDate, getGender } from "@/lib/helpers";
import { PersonFullInfo } from "@/types/credits";

// uhh asdasdasdasd
type Props = {
  person: PersonFullInfo;
};

export default function PersonalInfo({ person }: Props) {
  return (
    <div className="flex flex-col gap-3 max-md:text-sm">
      <p className="font-bold text-lg">Personal Info</p>
      <div>
        <p className="font-semibold">Known For</p>
        <p className="font-sm">{person.known_for_department || "-"}</p>
      </div>
      <div>
        <p className="font-semibold">Gender</p>
        <p className="font-sm">{getGender(person.gender) || "-"}</p>
      </div>
      <div>
        <p className="font-semibold">Birthdate</p>
        <p className="font-sm">{formatDate(person.birthday) || "-"}</p>
      </div>
      {person.deathday && (
        <div>
          <p className="font-semibold">Date of Death</p>
          <p className="font-sm">{formatDate(person.deathday)}</p>
        </div>
      )}
      <div>
        <p className="font-semibold">Place of Birth</p>
        <p className="font-sm">{person.place_of_birth || "-"}</p>
      </div>
      <div>
        <p className="font-semibold">Also Known As</p>
        {person.also_known_as.length > 0
          ? person.also_known_as.map((aka, index) => (
              <p className="font-sm" key={index + aka.length + aka[0]}>
                {aka}
              </p>
            ))
          : "-"}
      </div>
    </div>
  );
}
