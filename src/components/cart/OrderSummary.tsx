
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderSummaryProps {
  subtotal: number;
  handleCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, handleCheckout }) => {
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-4 pt-4 flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-green-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="space-y-4 mb-4">
            <div>
              <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
                Promo Code
              </label>
              <div className="flex">
                <Input 
                  id="promo-code" 
                  type="text" 
                  placeholder="Enter code" 
                  className="rounded-r-none"
                />
                <Button variant="outline" className="rounded-l-none border-l-0">
                  Apply
                </Button>
              </div>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={handleCheckout} 
              className="w-full bg-green-600 hover:bg-green-700 transition-all py-6 font-bold text-base gap-2"
            >
              <CreditCard size={18} />
              Checkout
            </Button>
          </motion.div>
          
          <div className="mt-4 text-center">
            <Link 
              to="/products" 
              className="text-sm text-green-600 hover:text-green-700 inline-flex items-center transition-colors"
            >
              <ArrowRight size={14} className="mr-1 rotate-180" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
