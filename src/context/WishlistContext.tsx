
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, WishlistItem } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist from localStorage', e);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  const addToWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist.`,
      });
      return;
    }
    
    setWishlist(prevWishlist => [
      ...prevWishlist, 
      { 
        product, 
        addedAt: new Date().toISOString() 
      }
    ]);
    
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.product.id !== productId));
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };
  
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };
  
  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };
  
  const totalWishlistItems = wishlist.length;

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist, 
        clearWishlist, 
        totalWishlistItems 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
