import { Skeleton } from "../ui/skeleton";

export default function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl saas-card bg-muted/50">
      <div className="relative z-10 p-12 md:p-16 flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-12" />
        </div>

        <div className="flex items-baseline gap-3">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-10 w-16" />
        </div>

        <Skeleton className="h-6 w-1/2" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-7 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <Skeleton className="h-5 w-40" />

        <div className="flex items-center gap-4 mt-4">
          <Skeleton className="h-11 w-40" />
        </div>
      </div>
    </section>
  );
}
