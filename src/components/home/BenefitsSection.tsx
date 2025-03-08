
import React from 'react';
import { ShieldCheck, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const BenefitsSection: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };
  
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
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
  );
};

export default BenefitsSection;
