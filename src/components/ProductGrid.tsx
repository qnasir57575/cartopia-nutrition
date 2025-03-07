
import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
      
      {products.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-full py-10 text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <ShoppingBag size={48} className="text-gray-300 mb-3" />
            <p className="text-gray-600">No products found.</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductGrid;
