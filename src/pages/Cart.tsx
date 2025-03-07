
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/auth/AuthModal';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemList from '@/components/cart/CartItemList';
import OrderSummary from '@/components/cart/OrderSummary';
import OrderSuccess from '@/components/cart/OrderSuccess';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsCheckingOut(true);
  };
  
  const handleOrderSuccess = () => {
    setIsCheckingOut(false);
    setOrderComplete(true);
  };

  // If order is complete, show thank you message
  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <OrderSuccess />
        <Footer />
      </div>
    );
  }
  
  // If checking out, show checkout form
  if (isCheckingOut) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow py-12 px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <button 
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => setIsCheckingOut(false)}
            >
              <span className="mr-2">&larr;</span> Back to Cart
            </button>
          </div>
          <CheckoutForm onSuccess={handleOrderSuccess} />
        </div>
        <Footer />
      </div>
    );
  }
  
  // If cart is empty, show empty cart message
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <EmptyCart />
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Your Cart
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <CartItemList 
              items={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
            
            {/* Order Summary */}
            <OrderSummary 
              subtotal={subtotal}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultView="login"
      />
      
      <Footer />
    </div>
  );
};

export default Cart;
