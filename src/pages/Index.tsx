
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import ProductFeatureBanner from '@/components/ProductFeatureBanner';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  // Get the first featured product for the hero banner
  const featuredProduct = products.find(p => p.featured) || products[0];
  
  // Get a few products for the showcase
  const showcaseProducts = products.slice(0, 4);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Premium Nutrition for <span className="text-primary">Peak Performance</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Fuel your body with our science-backed protein powders and supplements. Quality ingredients for maximum results.
              </p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link to="/products">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 py-6 font-medium text-base hover-lift">
                    Shop Now <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="rounded-full px-6 py-6 font-medium text-base hover-lift">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Fitness enthusiast using our protein products" 
                className="rounded-2xl shadow-2xl hover-scale object-cover h-[500px] w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Product Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Product</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular product, carefully selected for its exceptional quality and effectiveness.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductFeatureBanner product={featuredProduct} />
          </motion.div>
        </div>
      </section>
      
      {/* Product Showcase Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Bestsellers
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/products">
                <Button variant="link" className="text-primary text-base">
                  View All Products <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <ProductGrid products={showcaseProducts} />
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At typecabNutrition, we're committed to providing the highest quality nutrition products to help you achieve your fitness goals.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift"
              variants={fadeIn}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We source only the highest quality ingredients for our products, ensuring maximum efficacy and results.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift"
              variants={fadeIn}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Science-Backed</h3>
              <p className="text-gray-600">
                Our formulations are based on the latest scientific research to deliver optimal nutrition and results.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift"
              variants={fadeIn}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Shipping</h3>
              <p className="text-gray-600">
                We offer quick and reliable shipping so you can start enjoying the benefits of our products without delay.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-green-600 to-green-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Fitness Journey?
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of satisfied customers who have improved their performance with typecabNutrition supplements.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/products">
              <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 rounded-full px-8 py-7 text-lg font-semibold">
                Start Shopping Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Index;
