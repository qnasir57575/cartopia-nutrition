
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle size={80} className="text-green-500" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. We'll send you an email with the order details shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              Continue Shopping <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="outline" className="w-full sm:w-auto">
              View Wishlist <Heart size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
