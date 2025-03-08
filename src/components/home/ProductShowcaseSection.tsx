
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';

interface ProductShowcaseSectionProps {
  products: Product[];
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({ products }) => {
  return (
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
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
