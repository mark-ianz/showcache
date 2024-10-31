type Props = { year: number; showName: string };

export default function ShowNameWYear({ showName, year }: Props) {
  return (
    <div className="flex gap-4 items-center">
      <p className="font-bold text-3xl max-md:text-2xl max-sm:text-xl">{showName}</p>
      <p className="text-2xl max-md:text-xl max-sm:text-lg">({year || "N/A"})</p>
    </div>
  );
}
