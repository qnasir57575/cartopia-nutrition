
import React from 'react';
import { products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProductSection from '@/components/home/FeaturedProductSection';
import ProductShowcaseSection from '@/components/home/ProductShowcaseSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  // Get the first featured product for the hero banner
  const featuredProduct = products.find(p => p.featured) || products[0];
  
  // Get a few products for the showcase
  const showcaseProducts = products.slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturedProductSection product={featuredProduct} />
      <ProductShowcaseSection products={showcaseProducts} />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
