
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;
