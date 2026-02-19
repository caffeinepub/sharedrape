import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Size, Occasion } from '../../backend';
import { toast } from 'sonner';

interface Step2Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2DressDetails({ data, onUpdate, onNext, onBack }: Step2Props) {
  const [brand, setBrand] = useState(data.brand || '');
  const [color, setColor] = useState(data.color || '');
  const [size, setSize] = useState(data.size || '');
  const [occasion, setOccasion] = useState(data.occasion || '');
  const [originalPrice, setOriginalPrice] = useState(data.originalPrice || '');

  const handleNext = () => {
    if (!brand || !color || !size || !occasion || !originalPrice) {
      toast.error('Please fill in all fields');
      return;
    }
    onUpdate({ brand, color, size, occasion, originalPrice });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Dress Details</h2>
        <p className="text-charcoal/70">Tell us about your designer dress</p>
      </div>

      <div>
        <Label htmlFor="brand">Brand *</Label>
        <Input
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g., Sabyasachi, Manish Malhotra"
        />
      </div>

      <div>
        <Label htmlFor="color">Color *</Label>
        <Input
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="e.g., Royal Blue, Emerald Green"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="size">Size *</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger id="size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Size.XS}>XS</SelectItem>
              <SelectItem value={Size.S}>S</SelectItem>
              <SelectItem value={Size.M}>M</SelectItem>
              <SelectItem value={Size.L}>L</SelectItem>
              <SelectItem value={Size.XL}>XL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="occasion">Occasion *</Label>
          <Select value={occasion} onValueChange={setOccasion}>
            <SelectTrigger id="occasion">
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Occasion.wedding}>Wedding</SelectItem>
              <SelectItem value={Occasion.party}>Party</SelectItem>
              <SelectItem value={Occasion.formal}>Formal</SelectItem>
              <SelectItem value={Occasion.casual}>Casual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="originalPrice">Original Price (₹) *</Label>
        <Input
          id="originalPrice"
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="e.g., 50000"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-rosePink hover:bg-rosePink/90">
          Continue
        </Button>
      </div>
    </div>
  );
}
