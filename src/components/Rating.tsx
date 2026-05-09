import RatingIcon from "@/icons/RatingIcon";

export default function Rating({ rating }: { rating: number }) {
  return (
    rating !== 0 && (
      <div className="flex items-center gap-1">
        <RatingIcon className="text-primary fill-primary w-3 h-3" />
        <span className="text-[13px] font-semibold text-primary/90">
          {rating.toFixed(1)}
        </span>
      </div>


    )
  );
}
