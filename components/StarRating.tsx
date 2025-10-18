
import React from 'react';
import Icon from './Icon';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, size = 'md' }) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  const isInteractive = !!setRating;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const currentRating = hoverRating || rating;
        return (
          <label key={star} className={isInteractive ? 'cursor-pointer' : ''}>
            <input
              type="radio"
              name="rating"
              value={star}
              className="sr-only"
              onClick={() => setRating?.(star)}
              readOnly={!isInteractive}
            />
            <Icon 
              name="star"
              className={`${sizeClasses[size]} transition-colors duration-150 ${
                star <= currentRating
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onMouseEnter={() => isInteractive && setHoverRating(star)}
              onMouseLeave={() => isInteractive && setHoverRating(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
