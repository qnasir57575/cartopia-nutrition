
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

interface WishlistButtonProps {
  product: Product;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  variant = 'ghost',
  size = 'icon',
  showText = false
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className={`${isWishlisted ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'} transition-colors`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <motion.span
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <Heart 
          className={isWishlisted ? "fill-current" : ""} 
          size={20}
        />
      </motion.span>
      {showText && (
        <span className="ml-2">
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </span>
      )}
    </Button>
  );
};

export default WishlistButton;
