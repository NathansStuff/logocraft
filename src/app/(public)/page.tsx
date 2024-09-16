import { Suspense, lazy } from 'react';
import Hero from './Hero';
import SkeletonHomePage from './SkeletonHomePage';

// Lazy load components
const LogoTicker = lazy(() => import('./LogoTicker'));
const ProductShowcase = lazy(() => import('./ProductShowcase'));
const Pricing = lazy(() => import('./Pricing'));
const Testimonials = lazy(() => import('./Testimonials'));
const CallToAction = lazy(() => import('./CallToAction'));
const Footer = lazy(() => import('./Footer'));

function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SkeletonHomePage />}>
        <LogoTicker />
        <ProductShowcase />
        <Pricing />
        <Testimonials />
        <CallToAction />
        <Footer />
      </Suspense>
    </>
  );
}

export default HomePage;
