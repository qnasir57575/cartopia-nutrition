
import React from 'react';
import { WishlistItem } from '@/lib/types';
import WishlistItemCard from './WishlistItemCard';
import { Button } from '@/components/ui/button';
import { Trash, AlertCircle } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center bg-white rounded-xl p-5 shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="text-primary font-bold mr-2">{items.length}</span>
          {items.length === 1 ? 'item' : 'items'} in your wishlist
        </h2>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border-red-100 font-medium"
            >
              <Trash size={16} className="mr-2" />
              Clear Wishlist
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear your wishlist?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all items from your wishlist. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleClearWishlist}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Clear Wishlist
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
      
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <WishlistItemCard product={item.product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WishlistGrid;
