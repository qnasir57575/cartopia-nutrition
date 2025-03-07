
import React from 'react';
import { Link } from 'react-router-dom';
import { WishlistItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ShoppingCart, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import RatingStars from '../RatingStars';

interface WishlistItemCardProps {
  item: WishlistItem;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const { product } = item;
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  const formattedDate = new Date(item.addedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-48 overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
        
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-center mt-1 mb-2">
                <RatingStars rating={product.rating} size={16} />
                <span className="ml-2 text-sm text-gray-500">
                  {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
            
            <div className="text-xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-xs text-gray-500 mb-2 sm:mb-0">
              Added on {formattedDate}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost" 
                size="sm" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Trash size={16} className="mr-1" />
                Remove
              </Button>
              
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={16} className="mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistItemCard;
