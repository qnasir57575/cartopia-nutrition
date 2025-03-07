
import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      
      {products.length === 0 && (
        <div className="col-span-full py-10 text-center">
          <p className="text-gray-600">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
