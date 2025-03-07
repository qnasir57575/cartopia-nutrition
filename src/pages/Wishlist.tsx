
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/context/WishlistContext';
import EmptyWishlist from '@/components/wishlist/EmptyWishlist';
import WishlistGrid from '@/components/wishlist/WishlistGrid';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex items-center"
          >
            <Heart className="text-green-600 mr-2" size={24} />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </motion.div>
          
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
