import React from 'react';
import { Product } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ShoppingCart, Trash, ExternalLink, Clock, BadgeCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import RatingStars from '../RatingStars';
import { useToast } from '@/hooks/use-toast';

interface WishlistItemCardProps {
  product: Product;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(product.id);
    toast({
      title: "Removed from wishlist",
      description: `${product.name} has been removed from your wishlist.`,
    })
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart and removed from your wishlist.`,
    })
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-2">
          <RatingStars rating={product.rating} />
          <span className="text-gray-600 ml-2">({product.rating.toFixed(1)})</span>
        </div>
      </div>

      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white font-bold text-xl flex items-center">
              <AlertTriangle size={20} className="mr-2" />
              Out of Stock
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-gray-700">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-primary hover:bg-primary/90 text-white rounded-full text-sm px-4 py-2"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="ghost"
            onClick={handleRemoveFromWishlist}
            className="hover:text-red-600"
          >
            <Trash size={16} className="mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistItemCard;
