import { Skeleton } from "../ui/skeleton";
import { AspectRatio } from "../ui/aspect-ratio";

export default function ShowCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="saas-card overflow-hidden rounded-none border-none shadow-none bg-muted/20">
        <AspectRatio ratio={2 / 3}>
          <Skeleton className="w-full h-full rounded-none" />
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-1.5 px-0.5">
        <Skeleton className="h-4 w-3/4 rounded-none" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-1/4 rounded-none" />
          <Skeleton className="h-3.5 w-10 rounded-none" />
        </div>
      </div>
    </div>
  );
}
