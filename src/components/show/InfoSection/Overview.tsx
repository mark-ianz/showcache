type Props = {
  overview: string;
};

export default function Overview({ overview }: Props) {
  return (
    <div>
      <p className="text-lg font-semibold">Overview</p>
      <p>{overview || "No overview provided."}</p>
    </div>
  );
}
