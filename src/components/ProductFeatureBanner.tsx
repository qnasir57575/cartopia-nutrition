
import React from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface ProductFeatureBannerProps {
  product: Product;
}

const ProductFeatureBanner: React.FC<ProductFeatureBannerProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          <div className="text-2xl font-bold text-green-600 mb-6">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={() => addToCart(product, 1)} 
              className="bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="rounded-lg shadow-lg w-full max-h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFeatureBanner;
