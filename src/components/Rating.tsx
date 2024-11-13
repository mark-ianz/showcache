import RatingIcon from "@/icons/RatingIcon";

export default function Rating({ rating }: { rating: number }) {
  return (
    rating !== 0 && (
      <div className="flex items-center gap-1">
        <RatingIcon />
        <p className="text-sm font-thin text-muted-foreground max-sm:text-xs">
          {rating.toFixed(1)}
        </p>
      </div>
    )
  );
}
