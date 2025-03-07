
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import RatingStars from './RatingStars';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-60 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
          <div className="absolute top-2 left-2">
            <WishlistButton product={product} />
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg text-gray-900 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <RatingStars rating={product.rating} />
          <span className="text-gray-700 font-semibold">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <Button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
