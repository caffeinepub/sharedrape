import { Outlet, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import ProfileSetupModal from './ProfileSetupModal';
import LoginButton from './LoginButton';
import NotificationBell from './NotificationBell';
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Layout() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const navLinks = [
    { label: 'Browse Dresses', path: '/listings' },
    { label: 'Resale', path: '/resale' },
    { label: 'Style Circles', path: '/circles' },
    { label: 'Start a Group', path: '/create-group' },
  ];

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <button
          key={link.path}
          onClick={() => navigate({ to: link.path })}
          className="text-charcoal hover:text-rosePink transition-colors font-medium"
        >
          {link.label}
        </button>
      ))}
      {isAuthenticated && (
        <button
          onClick={() => navigate({ to: '/profile' })}
          className="text-charcoal hover:text-rosePink transition-colors font-medium"
        >
          Profile
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {showProfileSetup && <ProfileSetupModal />}
      
      {/* Header */}
      <header className="bg-white border-b border-charcoal/10 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 group"
            >
              <Sparkles className="w-8 h-8 text-rosePink" />
              <span className="font-heading text-2xl font-bold text-charcoal group-hover:text-rosePink transition-colors">
                ShareDrape
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated && <NotificationBell />}
              <LoginButton />
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-4 mt-8">
                    <NavLinks />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">ShareDrape</h3>
              <p className="text-ivory/80">
                Own less. Wear more. Share luxury fashion sustainably.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-ivory/80">
                <li>
                  <button onClick={() => navigate({ to: '/listings' })} className="hover:text-rosePink transition-colors">
                    Browse Dresses
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ to: '/create-group' })} className="hover:text-rosePink transition-colors">
                    Start a Group
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ to: '/circles' })} className="hover:text-rosePink transition-colors">
                    Style Circles
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-ivory/80">
                <li>How It Works</li>
                <li>Trust & Safety</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-ivory/20 mt-8 pt-8 text-center text-ivory/60">
            <p>
              © {new Date().getFullYear()} ShareDrape. Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rosePink hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
