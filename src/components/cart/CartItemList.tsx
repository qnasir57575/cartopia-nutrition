
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItemListProps {
  items: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ 
  items, 
  updateQuantity, 
  removeFromCart, 
  clearCart 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2"
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {items.map(item => (
              <motion.div 
                key={item.product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="p-6 flex flex-col sm:flex-row hover:bg-gray-50 transition-colors"
              >
                <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <Link to={`/product/${item.product.id}`}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded shadow-sm hover:shadow-md transition-shadow"
                    />
                  </Link>
                </div>
                
                <div className="flex-grow">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex flex-wrap items-center mt-2 sm:mt-1">
                    <div className="text-gray-700 font-medium mr-4">
                      ${item.product.price.toFixed(2)}
                    </div>
                    
                    <div className="flex items-center mr-4 mt-2 sm:mt-0">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-gray-100 transition-colors" 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-gray-100 transition-colors" 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    
                    <div className="font-bold ml-auto mt-2 sm:mt-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 transition-colors"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash size={16} className="mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          onClick={clearCart}
        >
          <Trash size={16} className="mr-2" />
          Clear Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItemList;
