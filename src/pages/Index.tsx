
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import ProductFeatureBanner from '@/components/ProductFeatureBanner';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Get the first featured product for the hero banner
  const featuredProduct = products.find(p => p.featured) || products[0];
  
  // Get a few products for the showcase
  const showcaseProducts = products.slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Premium Nutrition for <span className="text-green-600">Peak Performance</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Fuel your body with our science-backed protein powders and supplements. Quality ingredients for maximum results.
              </p>
              <div className="flex space-x-4">
                <Link to="/products">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Shop Now <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Fitness enthusiast using our protein products" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Product Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Product</h2>
          <ProductFeatureBanner product={featuredProduct} />
        </div>
      </section>
      
      {/* Product Showcase Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Bestsellers</h2>
            <Link to="/products">
              <Button variant="link" className="text-green-600">
                View All Products <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={showcaseProducts} />
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Why Choose Us</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            At typecabNutrition, we're committed to providing the highest quality nutrition products to help you achieve your fitness goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We source only the highest quality ingredients for our products, ensuring maximum efficacy and results.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Science-Backed</h3>
              <p className="text-gray-600">
                Our formulations are based on the latest scientific research to deliver optimal nutrition and results.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                We offer quick and reliable shipping so you can start enjoying the benefits of our products without delay.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
