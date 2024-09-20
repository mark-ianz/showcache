import RatingIcon from "@/icons/RatingIcon";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <RatingIcon />
      <p>{rating.toFixed(1)}</p>
    </div>
  );
}
