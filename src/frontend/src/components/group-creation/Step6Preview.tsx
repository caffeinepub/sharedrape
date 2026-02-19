import { useNavigate } from '@tanstack/react-router';
import { useCreateGroup } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalBlob } from '../../backend';
import { toast } from 'sonner';
import { useState } from 'react';

interface Step6Props {
  data: any;
  onBack: () => void;
}

export default function Step6Preview({ data, onBack }: Step6Props) {
  const navigate = useNavigate();
  const createGroup = useCreateGroup();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Convert photos to ExternalBlob
      const photoBlobs: ExternalBlob[] = [];
      for (const photo of data.photos) {
        const arrayBuffer = await photo.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        photoBlobs.push(ExternalBlob.fromBytes(uint8Array));
      }

      // Convert authenticity proof
      const proofArrayBuffer = await data.authenticityProof.arrayBuffer();
      const proofBlob = ExternalBlob.fromBytes(new Uint8Array(proofArrayBuffer));

      await createGroup.mutateAsync({
        photos: photoBlobs,
        productLink: data.productLink,
        brand: data.brand,
        color: data.color,
        size: data.size,
        occasion: data.occasion,
        originalPrice: data.originalPrice,
        authenticityProof: proofBlob,
        groupSize: parseInt(data.groupSize),
        rotationCity: data.rotationCity,
        priorityFees: data.priorityFees,
      });

      toast.success('Group created successfully!');
      navigate({ to: '/listings' });
    } catch (error) {
      console.error('Failed to create group:', error);
      toast.error('Failed to create group. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Preview & Publish</h2>
        <p className="text-charcoal/70">Review your listing before publishing</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.photos?.slice(0, 3).map((photo: File, index: number) => (
          <img
            key={index}
            src={URL.createObjectURL(photo)}
            alt={`Preview ${index + 1}`}
            className="w-full aspect-square object-cover rounded-lg"
          />
        ))}
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-charcoal/70">Brand</span>
          <span className="font-semibold">{data.brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/70">Color</span>
          <span className="font-semibold">{data.color}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/70">Size</span>
          <span className="font-semibold">{data.size}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/70">Occasion</span>
          <span className="font-semibold">{data.occasion}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/70">Original Price</span>
          <span className="font-semibold">₹{parseInt(data.originalPrice).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/70">Group Size</span>
          <span className="font-semibold">{data.groupSize} members</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/70">Rotation City</span>
          <span className="font-semibold">{data.rotationCity}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Priority Slot Pricing</h3>
        <div className="space-y-2">
          {data.priorityFees?.map((fee: number, index: number) => (
            <div key={index} className="flex justify-between text-sm">
              <span>Slot {index + 1}</span>
              <span className="font-semibold">
                {fee > 0 ? `+₹${fee.toLocaleString()}` : 'Free'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isPublishing}>
          Back
        </Button>
        <Button
          onClick={handlePublish}
          className="flex-1 bg-rosePink hover:bg-rosePink/90"
          disabled={isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish Listing'}
        </Button>
      </div>
    </div>
  );
}
