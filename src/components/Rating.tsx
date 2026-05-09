import RatingIcon from "@/icons/RatingIcon";

export default function Rating({ rating }: { rating: number }) {
  return (
    rating !== 0 && (
      <div className="flex items-center gap-1.5">
        <RatingIcon className="text-primary fill-primary w-3.5 h-3.5" />
        <p className="text-sm font-semibold text-primary/80 tracking-tighter">
          {rating.toFixed(1)}
        </p>
      </div>

    )
  );
}
