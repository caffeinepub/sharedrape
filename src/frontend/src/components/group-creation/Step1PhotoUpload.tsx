import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface Step1Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export default function Step1PhotoUpload({ data, onUpdate, onNext }: Step1Props) {
  const [photos, setPhotos] = useState<File[]>(data.photos || []);
  const [productLink, setProductLink] = useState(data.productLink || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 10) {
      toast.error('Maximum 10 photos allowed');
      return;
    }
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (photos.length < 3) {
      toast.error('Please upload at least 3 photos');
      return;
    }
    onUpdate({ photos, productLink });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Upload Dress Photos</h2>
        <p className="text-charcoal/70">Add at least 3 high-quality photos of your dress</p>
      </div>

      <div>
        <Label htmlFor="photos">Dress Photos * (Min 3, Max 10)</Label>
        <div className="mt-2 border-2 border-dashed border-charcoal/20 rounded-lg p-8 text-center hover:border-rosePink transition-colors">
          <input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="photos" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto text-charcoal/40 mb-4" />
            <p className="text-charcoal/70">Click to upload or drag and drop</p>
            <p className="text-sm text-charcoal/50 mt-2">PNG, JPG up to 10MB each</p>
          </label>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <Label htmlFor="productLink">Product Link (Optional)</Label>
        <Input
          id="productLink"
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          placeholder="https://example.com/dress"
        />
      </div>

      <Button
        onClick={handleNext}
        className="w-full bg-rosePink hover:bg-rosePink/90"
        disabled={photos.length < 3}
      >
        Continue
      </Button>
    </div>
  );
}
