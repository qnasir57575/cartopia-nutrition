
import React from 'react';
import { Link } from 'react-router-dom';
import { WishlistItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ShoppingCart, Trash, ExternalLink, Clock, BadgeCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import RatingStars from '../RatingStars';
import { useToast } from '@/hooks/use-toast';

interface WishlistItemCardProps {
  item: WishlistItem;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const { product } = item;
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };
  
  const handleRemove = () => {
    removeFromWishlist(product.id);
    toast({
      title: "Removed from wishlist",
      description: `${product.name} has been removed from your wishlist`,
      duration: 3000,
    });
  };
  
  const formattedDate = new Date(item.addedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div
      layout
      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-60 h-60 relative group overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <motion.img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </Link>
          {product.stock <= 0 && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors group flex items-center gap-1">
                  {product.name}
                  <ExternalLink size={16} className="inline opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </Link>
              
              <div className="flex items-center mt-2 mb-3">
                <RatingStars rating={product.rating} size={16} />
                <span className="ml-2 text-sm text-gray-500">
                  {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
            
            <div className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-5 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-xs text-gray-500 mb-3 sm:mb-0 flex items-center">
              <Clock size={14} className="mr-1" />
              Added on {formattedDate}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                  onClick={handleRemove}
                >
                  <Trash size={16} className="mr-1" />
                  Remove
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? (
                    <>
                      <ShoppingCart size={16} className="mr-1" />
                      Add to Cart
                    </>
                  ) : (
                    <>
                      Out of Stock
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
          
          {product.stock > 0 && product.stock <= 5 && (
            <div className="mt-3 text-xs flex items-center text-amber-600">
              <AlertTriangle size={14} className="mr-1" />
              Only {product.stock} items left in stock
            </div>
          )}
          
          {product.stock > 5 && (
            <div className="mt-3 text-xs flex items-center text-green-600">
              <BadgeCheck size={14} className="mr-1" />
              In stock and ready to ship
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistItemCard;
