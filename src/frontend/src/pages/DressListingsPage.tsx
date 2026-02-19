import { useState } from 'react';
import { useGetAllDresses } from '../hooks/useQueries';
import DressCard from '../components/DressCard';
import DressFilters from '../components/DressFilters';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function DressListingsPage() {
  const { data: dresses, isLoading } = useGetAllDresses();
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    occasion: '',
  });

  const filteredDresses = dresses?.filter((dress) => {
    if (filters.size && dress.size !== filters.size) return false;
    if (filters.color && !dress.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
    if (filters.city && !dress.rotationCity.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.occasion && dress.occasion !== filters.occasion) return false;
    
    const price = Number(dress.originalPrice);
    if (filters.minPrice && price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && price > Number(filters.maxPrice)) return false;
    
    return true;
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-4">Browse Designer Dresses</h1>
        <p className="text-lg text-charcoal/70">Find your perfect dress and join a sharing group</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar filters={filters} />
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <DressFilters filters={filters} onChange={setFilters} />
          </div>
        </aside>

        {/* Mobile Filters */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-rosePink hover:bg-rosePink/90 rounded-full shadow-lg">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <DressFilters filters={filters} onChange={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Dress Grid */}
        <div className="flex-1">
          {isLoading ? (
            <SkeletonLoader variant="card" count={6} />
          ) : filteredDresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDresses.map((dress) => (
                <DressCard key={dress.id} dress={dress} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-charcoal/60">No dresses match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
