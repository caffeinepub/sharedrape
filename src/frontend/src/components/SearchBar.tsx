import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchDresses } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';

interface SearchBarProps {
  filters: any;
}

export default function SearchBar({ filters }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const navigate = useNavigate();

  const { data: searchResults } = useSearchDresses({
    searchTerm: debouncedTerm,
    occasion: filters.occasion || '',
    city: filters.city || '',
    priceRange: '',
    size: filters.size || '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by brand, color, or occasion..."
        className="pl-10 h-12"
      />
      
      {searchTerm && searchResults && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-charcoal/10 max-h-96 overflow-y-auto z-50">
          {searchResults.map((dress) => (
            <button
              key={dress.id}
              onClick={() => {
                navigate({ to: '/dress/$dressId', params: { dressId: dress.id } });
                setSearchTerm('');
              }}
              className="w-full p-3 hover:bg-ivory transition-colors text-left flex items-center gap-3"
            >
              <img
                src={dress.photos[0]?.getDirectURL() || '/assets/generated/placeholder-dress.dim_400x600.png'}
                alt={dress.brand}
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-charcoal">{dress.brand}</p>
                <p className="text-sm text-charcoal/60">{dress.color} • {dress.occasion}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
