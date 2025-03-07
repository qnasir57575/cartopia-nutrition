
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ShoppingBag, ArrowRight, Trash, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  
  const handleCheckout = () => {
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed. Thank you for shopping with us!",
    });
    clearCart();
  };
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                Start Shopping <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cart.map(item => (
                    <div key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                        <Link to={`/product/${item.product.id}`}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="text-lg font-medium text-gray-900 hover:text-green-600">
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
                              className="h-8 w-8" 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
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
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={clearCart}
                >
                  <Trash size={16} className="mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
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
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${(subtotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 my-4 pt-4 flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-green-600">
                        ${(subtotal + subtotal * 0.1).toFixed(2)}
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
                  
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Checkout
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      to="/products" 
                      className="text-sm text-green-600 hover:text-green-700 inline-flex items-center"
                    >
                      <ArrowRight size={14} className="mr-1 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
