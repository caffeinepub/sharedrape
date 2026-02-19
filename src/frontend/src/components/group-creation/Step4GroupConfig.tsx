import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Step4Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4GroupConfig({ data, onUpdate, onNext, onBack }: Step4Props) {
  const [groupSize, setGroupSize] = useState(data.groupSize || '');
  const [rotationCity, setRotationCity] = useState(data.rotationCity || '');

  const handleNext = () => {
    if (!groupSize || !rotationCity) {
      toast.error('Please fill in all fields');
      return;
    }
    onUpdate({ groupSize, rotationCity });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Group Configuration</h2>
        <p className="text-charcoal/70">Set up your sharing group preferences</p>
      </div>

      <div>
        <Label htmlFor="groupSize">Group Size *</Label>
        <Select value={groupSize} onValueChange={setGroupSize}>
          <SelectTrigger id="groupSize">
            <SelectValue placeholder="Select group size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 members</SelectItem>
            <SelectItem value="4">4 members</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-charcoal/60 mt-2">
          Smaller groups mean more wears per person
        </p>
      </div>

      <div>
        <Label htmlFor="rotationCity">Rotation City/Hub *</Label>
        <Input
          id="rotationCity"
          value={rotationCity}
          onChange={(e) => setRotationCity(e.target.value)}
          placeholder="e.g., Mumbai, Delhi, Bangalore"
        />
        <p className="text-sm text-charcoal/60 mt-2">
          Members should be in or near this city for easy handovers
        </p>
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
