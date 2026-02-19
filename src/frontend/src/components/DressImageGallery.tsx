import { useState } from 'react';
import { ExternalBlob } from '../backend';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DressImageGalleryProps {
  photos: ExternalBlob[];
}

export default function DressImageGallery({ photos }: DressImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photoUrls = photos.map((photo) => photo.getDirectURL());

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photoUrls.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photoUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={photoUrls[currentIndex] || '/assets/generated/placeholder-dress.dim_400x600.png'}
          alt={`Dress photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {photoUrls.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photoUrls.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {photoUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-rosePink' : 'border-transparent'
              }`}
            >
              <img src={url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
