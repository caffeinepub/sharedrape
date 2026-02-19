import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Dress } from '../backend';
import { Users } from 'lucide-react';

interface DressCardProps {
  dress: Dress;
}

export default function DressCard({ dress }: DressCardProps) {
  const navigate = useNavigate();
  
  const sharePrice = Number(dress.originalPrice) / Number(dress.groupSize);
  const photoUrl = dress.photos[0]?.getDirectURL() || '/assets/generated/placeholder-dress.dim_400x600.png';

  const occasionColors: Record<string, string> = {
    wedding: 'bg-rosePink/20 text-rosePink',
    party: 'bg-purple-100 text-purple-700',
    formal: 'bg-blue-100 text-blue-700',
    casual: 'bg-green-100 text-green-700',
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={() => navigate({ to: '/dress/$dressId', params: { dressId: dress.id } })}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={photoUrl}
          alt={dress.brand}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-charcoal">{dress.brand}</h3>
            <p className="text-sm text-charcoal/60">{dress.color}</p>
          </div>
          <Badge className={occasionColors[dress.occasion] || 'bg-gray-100 text-gray-700'}>
            {dress.occasion}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-charcoal/60 line-through">₹{Number(dress.originalPrice).toLocaleString()}</p>
            <p className="text-lg font-bold text-rosePink">₹{sharePrice.toLocaleString()}/person</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-charcoal/70">
            <Users className="w-4 h-4" />
            <span>{Number(dress.slotsFilled)}/{Number(dress.groupSize)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
