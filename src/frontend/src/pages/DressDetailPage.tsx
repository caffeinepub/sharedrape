import { useParams } from '@tanstack/react-router';
import { useGetDress } from '../hooks/useQueries';
import DressImageGallery from '../components/DressImageGallery';
import DressDetails from '../components/DressDetails';
import SkeletonLoader from '../components/SkeletonLoader';

export default function DressDetailPage() {
  const { dressId } = useParams({ from: '/dress/$dressId' });
  const { data: dress, isLoading } = useGetDress(dressId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader variant="image" />
      </div>
    );
  }

  if (!dress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-charcoal/60">Dress not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DressImageGallery photos={dress.photos} />
        <DressDetails dress={dress} />
      </div>
    </div>
  );
}
