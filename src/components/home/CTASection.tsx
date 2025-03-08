
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
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
  );
};

export default CTASection;
