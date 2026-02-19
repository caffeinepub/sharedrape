import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface Step5Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5SlotPricing({ data, onUpdate, onNext, onBack }: Step5Props) {
  const [useCustomPricing, setUseCustomPricing] = useState(false);
  const [priorityFees, setPriorityFees] = useState<number[]>(data.priorityFees || []);

  const groupSize = parseInt(data.groupSize || '4');
  const originalPrice = parseInt(data.originalPrice || '0');

  useEffect(() => {
    if (!useCustomPricing) {
      // Auto-calculate priority fees
      const fees: number[] = [];
      for (let i = 0; i < groupSize; i++) {
        const fee = Math.floor(originalPrice * 0.1 * (groupSize - i - 1));
        fees.push(fee);
      }
      setPriorityFees(fees);
    }
  }, [useCustomPricing, groupSize, originalPrice]);

  const handleNext = () => {
    onUpdate({ priorityFees });
    onNext();
  };

  const updateFee = (index: number, value: string) => {
    const newFees = [...priorityFees];
    newFees[index] = parseInt(value) || 0;
    setPriorityFees(newFees);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2">Priority Slot Pricing</h2>
        <p className="text-charcoal/70">Set fees for priority rotation slots</p>
      </div>

      <div className="flex items-center justify-between p-4 bg-ivory rounded-lg">
        <div>
          <Label htmlFor="customPricing">Custom Pricing</Label>
          <p className="text-sm text-charcoal/60">Manually set slot fees</p>
        </div>
        <Switch
          id="customPricing"
          checked={useCustomPricing}
          onCheckedChange={setUseCustomPricing}
        />
      </div>

      <div className="space-y-4">
        {Array.from({ length: groupSize }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-charcoal/10 rounded-lg">
            <div>
              <p className="font-semibold">Slot {index + 1}</p>
              <p className="text-sm text-charcoal/60">
                {index === 0 ? 'First to wear' : index === groupSize - 1 ? 'Last to wear' : `Position ${index + 1}`}
              </p>
            </div>
            {useCustomPricing ? (
              <Input
                type="number"
                value={priorityFees[index] || 0}
                onChange={(e) => updateFee(index, e.target.value)}
                className="w-32"
                placeholder="0"
              />
            ) : (
              <p className="font-bold text-rosePink">
                {priorityFees[index] > 0 ? `+₹${priorityFees[index].toLocaleString()}` : 'Free'}
              </p>
            )}
          </div>
        ))}
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
