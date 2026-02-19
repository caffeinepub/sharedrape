import { useNavigate } from '@tanstack/react-router';
import type { Dress } from '../backend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Tag, Ruler, Calendar } from 'lucide-react';

interface DressDetailsProps {
  dress: Dress;
}

export default function DressDetails({ dress }: DressDetailsProps) {
  const navigate = useNavigate();
  const sharePrice = Number(dress.originalPrice) / Number(dress.groupSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-2">{dress.brand}</h1>
        <p className="text-xl text-charcoal/70">{dress.color}</p>
      </div>

      <div className="flex items-center gap-4">
        <Badge className="bg-rosePink/20 text-rosePink text-lg px-4 py-2">
          {dress.occasion}
        </Badge>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Size {dress.size}
        </Badge>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-charcoal/70">
          <MapPin className="w-5 h-5" />
          <span>Rotation City: {dress.rotationCity}</span>
        </div>
        <div className="flex items-center gap-3 text-charcoal/70">
          <Tag className="w-5 h-5" />
          <span>Group Size: {Number(dress.groupSize)} members</span>
        </div>
        <div className="flex items-center gap-3 text-charcoal/70">
          <Ruler className="w-5 h-5" />
          <span>Slots Filled: {Number(dress.slotsFilled)}/{Number(dress.groupSize)}</span>
        </div>
      </div>

      <Separator />

      <div className="bg-ivory p-6 rounded-lg">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-rosePink">₹{sharePrice.toLocaleString()}</span>
          <span className="text-charcoal/60">per person</span>
        </div>
        <p className="text-sm text-charcoal/60">
          Original Price: ₹{Number(dress.originalPrice).toLocaleString()}
        </p>
      </div>

      {dress.priorityFees && dress.priorityFees.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Priority Slot Pricing</h3>
          {dress.priorityFees.map((fee, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>Slot {index + 1}</span>
              <span className="font-semibold">
                {Number(fee) > 0 ? `+₹${Number(fee).toLocaleString()}` : 'Free'}
              </span>
            </div>
          ))}
        </div>
      )}

      <Button
        className="w-full bg-rosePink hover:bg-rosePink/90 text-white text-lg py-6"
        onClick={() => navigate({ to: '/create-group' })}
      >
        Request to Join Group
      </Button>

      {dress.productLink && (
        <a
          href={dress.productLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-rosePink hover:underline"
        >
          View Original Product
        </a>
      )}
    </div>
  );
}
