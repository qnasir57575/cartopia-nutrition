
import React from 'react';
import { Product } from '@/lib/types';
import ProductFeatureBanner from '@/components/ProductFeatureBanner';
import { motion } from 'framer-motion';

interface FeaturedProductSectionProps {
  product: Product;
}

const FeaturedProductSection: React.FC<FeaturedProductSectionProps> = ({ product }) => {
  return (
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
          <ProductFeatureBanner product={product} />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductSection;
