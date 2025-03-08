
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center mb-4">
              <Heart className="text-primary mr-3" size={28} />
              <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <p className="text-gray-600 max-w-3xl">
              Keep track of all the products you love and want to purchase later. Add items to your wishlist while you shop and they'll be saved here.
            </p>
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
