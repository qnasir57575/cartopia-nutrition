
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/context/WishlistContext';
import EmptyWishlist from '@/components/wishlist/EmptyWishlist';
import WishlistGrid from '@/components/wishlist/WishlistGrid';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {wishlist.length > 0 ? (
            <WishlistGrid items={wishlist} />
          ) : (
            <EmptyWishlist />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
