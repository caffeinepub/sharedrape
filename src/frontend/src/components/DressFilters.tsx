import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Size, Occasion } from '../backend';

interface DressFiltersProps {
  filters: {
    size: string;
    color: string;
    city: string;
    minPrice: string;
    maxPrice: string;
    occasion: string;
  };
  onChange: (filters: any) => void;
}

export default function DressFilters({ filters, onChange }: DressFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    // Convert special "all-*" values back to empty strings for state management
    const actualValue = value.startsWith('all-') ? '' : value;
    onChange({ ...filters, [key]: actualValue });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="size">Size</Label>
        <Select 
          value={filters.size || 'all-sizes'} 
          onValueChange={(value) => updateFilter('size', value)}
        >
          <SelectTrigger id="size">
            <SelectValue placeholder="All sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-sizes">All sizes</SelectItem>
            <SelectItem value={Size.XS}>XS</SelectItem>
            <SelectItem value={Size.S}>S</SelectItem>
            <SelectItem value={Size.M}>M</SelectItem>
            <SelectItem value={Size.L}>L</SelectItem>
            <SelectItem value={Size.XL}>XL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="occasion">Occasion</Label>
        <Select 
          value={filters.occasion || 'all-occasions'} 
          onValueChange={(value) => updateFilter('occasion', value)}
        >
          <SelectTrigger id="occasion">
            <SelectValue placeholder="All occasions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-occasions">All occasions</SelectItem>
            <SelectItem value={Occasion.wedding}>Wedding</SelectItem>
            <SelectItem value={Occasion.party}>Party</SelectItem>
            <SelectItem value={Occasion.formal}>Formal</SelectItem>
            <SelectItem value={Occasion.casual}>Casual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          value={filters.color}
          onChange={(e) => updateFilter('color', e.target.value)}
          placeholder="e.g., Red, Blue"
        />
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          placeholder="e.g., Mumbai, Delhi"
        />
      </div>

      <div>
        <Label>Price Range (₹)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Input
            type="number"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            placeholder="Min"
          />
          <Input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
}
