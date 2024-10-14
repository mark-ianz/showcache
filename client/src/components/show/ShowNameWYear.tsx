type Props = { year: number; showName: string };

export default function ShowNameWYear({ showName, year }: Props) {
  return (
    <div className="flex gap-4 items-center text-4xl">
      <p className="font-bold">{showName}</p>
      <p>({year || "N/A"})</p>
    </div>
  );
}
