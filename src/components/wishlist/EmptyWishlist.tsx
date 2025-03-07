
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EmptyWishlist: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-grow flex items-center justify-center py-16"
    >
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Heart size={80} className="text-gray-200" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart size={40} className="text-red-400 fill-current opacity-50" />
            </motion.div>
          </div>
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          Your Wishlist is Empty
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 mb-8 mx-auto max-w-sm"
        >
          Save your favorite items to come back to them later. Just click the heart icon on any product you love!
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700 transition-all w-full sm:w-auto">
              <ShoppingBag size={16} className="mr-2" />
              Browse Products
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Return Home <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyWishlist;
