type Props = { year: number; showName: string };

export default function ShowNameWYear({ showName, year }: Props) {
  return (
    <div className="flex gap-4 items-center text-3xl max-md:text-2xl">
      <p className="font-bold">{showName}</p>
      <p>({year || "N/A"})</p>
    </div>
  );
}
