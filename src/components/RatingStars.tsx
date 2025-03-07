
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  max = 5, 
  size = 16,
  className = ""
}) => {
  // Create an array of length 'max'
  const stars = Array.from({ length: max }, (_, index) => {
    const starValue = index + 1;
    
    // For full stars
    if (starValue <= rating) {
      return <Star key={index} fill="#FFD700" className="text-yellow-400" size={size} />;
    } 
    // For half stars (if the rating is at least 0.5 more than the current index)
    else if (starValue - 0.5 <= rating) {
      return <StarHalf key={index} fill="#FFD700" className="text-yellow-400" size={size} />;
    } 
    // For empty stars
    else {
      return <Star key={index} className="text-gray-300" size={size} />;
    }
  });

  return (
    <div className={`flex items-center ${className}`}>
      {stars}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
