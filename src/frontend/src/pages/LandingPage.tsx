import { useNavigate } from '@tanstack/react-router';
import { useGetAllDresses } from '../hooks/useQueries';
import DressCarousel from '../components/DressCarousel';
import TrustBadges from '../components/TrustBadges';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Calendar, ShoppingBag } from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';

export default function LandingPage() {
  const navigate = useNavigate();
  const { data: dresses, isLoading } = useGetAllDresses();

  const trendingDresses = dresses?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Own Less. Wear More.
          </h1>
          <p className="text-xl md:text-2xl text-ivory mb-8">
            Share luxury designer dresses with your circle. Sustainable fashion, unforgettable style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/create-group' })}
              className="bg-rosePink hover:bg-rosePink/90 text-white text-lg px-8 py-6"
            >
              Start a Group
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/listings' })}
              className="bg-white/90 hover:bg-white text-charcoal text-lg px-8 py-6"
            >
              Join a Group
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Listings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-charcoal mb-4">
              Trending Group Buys
            </h2>
            <p className="text-lg text-charcoal/70">
              Join these popular dress sharing groups
            </p>
          </div>
          
          {isLoading ? (
            <SkeletonLoader variant="card" />
          ) : trendingDresses.length > 0 ? (
            <DressCarousel dresses={trendingDresses} />
          ) : (
            <p className="text-center text-charcoal/60">No dresses available yet. Be the first to start a group!</p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-charcoal text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-rosePink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-rosePink" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">1. Form a Group</h3>
              <p className="text-charcoal/70">
                Create or join a group of 3-4 fashion lovers to share a designer dress
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-rosePink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-rosePink" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">2. Rotate & Wear</h3>
              <p className="text-charcoal/70">
                Each member gets their turn to wear the dress for special occasions
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-rosePink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-rosePink" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">3. Resell & Earn</h3>
              <p className="text-charcoal/70">
                After all rotations, resell the dress and split the proceeds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rosePink to-rosePink/80">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="font-heading text-4xl font-bold text-white mb-4">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-forward women sharing luxury sustainably
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/listings' })}
            className="bg-white text-rosePink hover:bg-ivory text-lg px-8 py-6"
          >
            Explore Dresses
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
