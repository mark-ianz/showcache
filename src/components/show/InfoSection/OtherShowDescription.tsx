type Props = { tagline: string; overview: string; directorList: string[] };

export default function OtherShowDescription({
  tagline,
  overview,
  directorList,
}: Props) {
  return (
    <div className="flex flex-col gap-2 max-md:text-sm">
      {tagline && <p className="text-muted-foreground italic">{tagline}</p>}
      <div>
        <p className="text-xl font-bold">Overview</p>
        <p>{overview || "No overview provided."}</p>
      </div>
      {directorList.length > 0 && (
        <p className="text-muted-foreground">
          Directed by {directorList.join(", ")}
        </p>
      )}
    </div>
  );
}
