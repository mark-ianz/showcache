import { Skeleton } from "../ui/skeleton";

export default function ShowDetailSkeleton() {
  return (
    <div className="flex w-full flex-col gap-10">
      {/* ViewInfoSection Skeleton */}
      <div className="w-full h-80 bg-muted/50 rounded-2xl animate-pulse" />
      
      <div className="flex gap-14 max-md:flex-col max-md:gap-5">
        <div className="flex-1 space-y-10">
          {/* Casts Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-32 flex-shrink-0" />
              ))}
            </div>
          </div>
          
          {/* ShowMedia Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>

        <div className="w-60 max-md:w-full space-y-6">
          <Skeleton className="h-8 w-full" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
