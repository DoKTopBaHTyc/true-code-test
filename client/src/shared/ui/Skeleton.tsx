type SkeletonProps = { className?: string };
export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

type SkeletonListProps = {
  items?: number;
  className?: string;
  itemClass?: string;
};
export function SkeletonList({
  items = 6,
  className = "",
  itemClass = "",
}: SkeletonListProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className={`bg-white rounded-xl shadow-md p-4 space-y-3 ${itemClass}`}
        >
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </div>
  );
}
