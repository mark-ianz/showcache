type Props = {
  info: string | null;
  item: string | number | null | JSX.Element | undefined;
};

export default function InfoItem({ info, item }: Props) {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">{info}</p>
      <span className="font-normal">{item || "-"}</span>
    </div>
  );
}
