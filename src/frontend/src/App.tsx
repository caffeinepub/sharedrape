import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DressListingsPage from './pages/DressListingsPage';
import DressDetailPage from './pages/DressDetailPage';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupDashboardPage from './pages/GroupDashboardPage';
import ResaleMarketplacePage from './pages/ResaleMarketplacePage';
import StyleCirclesPage from './pages/StyleCirclesPage';
import CircleDashboardPage from './pages/CircleDashboardPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import CleaningPartnerPortalPage from './pages/CleaningPartnerPortalPage';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listings',
  component: DressListingsPage,
});

const dressDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dress/$dressId',
  component: DressDetailPage,
});

const createGroupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-group',
  component: CreateGroupPage,
});

const groupDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/group/$groupId',
  component: GroupDashboardPage,
});

const resaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resale',
  component: ResaleMarketplacePage,
});

const circlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/circles',
  component: StyleCirclesPage,
});

const circleDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/circle/$circleId',
  component: CircleDashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: UserProfilePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanelPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const cleaningPartnerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cleaning-partner',
  component: CleaningPartnerPortalPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  listingsRoute,
  dressDetailRoute,
  createGroupRoute,
  groupDashboardRoute,
  resaleRoute,
  circlesRoute,
  circleDashboardRoute,
  profileRoute,
  adminRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  cleaningPartnerRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
