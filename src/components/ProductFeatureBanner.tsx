
import React from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import WishlistButton from './WishlistButton';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ProductFeatureBannerProps {
  product: Product;
}

const ProductFeatureBanner: React.FC<ProductFeatureBannerProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  return (
    <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            {product.description}
          </p>
          <div className="text-3xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex flex-wrap space-x-4 gap-y-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleAddToCart} 
                className="bg-primary hover:bg-primary/90 rounded-full px-6 py-6 text-base"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/product/${product.id}`}>
                <Button variant="outline" className="rounded-full px-6 py-6 text-base">
                  View Details <ChevronRight size={18} className="ml-1" />
                </Button>
              </Link>
            </motion.div>
            <WishlistButton product={product} showText={true} variant="outline" size="default" />
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="rounded-xl shadow-lg w-full max-h-80 object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductFeatureBanner;
