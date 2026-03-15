import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { SeasonalSection } from '@/components/SeasonalSection';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyMaryCandy } from '@/components/WhyMaryCandy';
import { Testimonials } from '@/components/Testimonials';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileCartButton } from '@/components/MobileCartButton';
import { CartSidebar } from '@/components/CartSidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <SeasonalSection />
        <HowItWorks />
        <WhyMaryCandy />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCartButton />
      <CartSidebar />
    </div>
  );
};

export default Index;
