
import React from 'react';
import { WishlistItem } from '@/lib/types';
import WishlistItemCard from './WishlistItemCard';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface WishlistGridProps {
  items: WishlistItem[];
}

const WishlistGrid: React.FC<WishlistGridProps> = ({ items }) => {
  const { clearWishlist } = useWishlist();
  const { toast } = useToast();
  
  const handleClearWishlist = () => {
    clearWishlist();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="text-green-600 font-bold mr-2">{items.length}</span>
          {items.length === 1 ? 'item' : 'items'} in your wishlist
        </h2>
        
        <Button 
          variant="outline" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border-red-200"
          onClick={handleClearWishlist}
        >
          <Trash size={16} className="mr-2" />
          Clear Wishlist
        </Button>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <WishlistItemCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WishlistGrid;
