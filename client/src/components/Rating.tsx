import RatingIcon from "@/icons/RatingIcon";

export default function Rating({ rating = 0 }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <RatingIcon />
      <p className="text-sm font-thin text-muted-foreground">
        {rating?.toFixed(1)}
      </p>
    </div>
  );
}
