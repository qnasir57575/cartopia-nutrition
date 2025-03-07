
import React from 'react';
import { WishlistItem } from '@/lib/types';
import WishlistItemCard from './WishlistItemCard';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { AnimatePresence } from 'framer-motion';

interface WishlistGridProps {
  items: WishlistItem[];
}

const WishlistGrid: React.FC<WishlistGridProps> = ({ items }) => {
  const { clearWishlist } = useWishlist();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h2>
        
        <Button 
          variant="outline" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          onClick={clearWishlist}
        >
          <Trash size={16} className="mr-2" />
          Clear Wishlist
        </Button>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {items.map(item => (
            <WishlistItemCard key={item.product.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistGrid;
