
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import RatingStars from './RatingStars';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import WishlistButton from './WishlistButton';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative h-64 overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5 }}
          />
          {product.featured && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </div>
          )}
          <div className="absolute top-2 left-2">
            <WishlistButton product={product} />
          </div>
          
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              Only {product.stock} left
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors group flex items-center gap-1">
            {product.name}
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <RatingStars rating={product.rating} />
          <span className="text-gray-900 font-bold text-lg">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-4">
          <Button 
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 w-full font-medium"
            disabled={product.stock === 0}
          >
            <ShoppingCart size={16} className="mr-2" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
