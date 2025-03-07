
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2, CreditCard, CalendarDays, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutFormProps {
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess }) => {
  const { subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Shipping info
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to complete your checkout",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Process successful
    toast({
      title: "Payment successful",
      description: "Your order has been placed and will be shipped soon.",
    });
    
    clearCart();
    setIsProcessing(false);
    onSuccess();
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setExpiryDate(value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Order</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Order Summary</h3>
            <span className="text-gray-600">
              Total: <span className="font-bold text-green-600">${(subtotal + subtotal * 0.1).toFixed(2)}</span>
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${(subtotal * 0.1).toFixed(2)}</p>
            <p>Shipping: Free</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Shipping Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="ZIP Code"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-green-600" />
            Payment Information
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <div className="relative">
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-all py-6 text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              'Complete Purchase'
            )}
          </Button>
        </div>
        
        <div className="text-center text-xs text-gray-500 flex items-center justify-center">
          <Lock className="h-3 w-3 mr-1" />
          Secure payment processing. We never store your card details.
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
