import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'image' | 'list';
  count?: number;
}

export default function SkeletonLoader({ variant = 'card', count = 3 }: SkeletonLoaderProps) {
  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    );
  }

  if (variant === 'image') {
    return <Skeleton className="h-[400px] w-full rounded-lg" />;
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}
