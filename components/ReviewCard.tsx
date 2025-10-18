import React from 'react';
import type { Review, Reply } from '../types';
import StarRating from './StarRating';
import Icon from './Icon';

interface ReviewCardProps {
  review: Review;
  businessName?: string;
  reply?: Reply;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, businessName, reply }) => {
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-bold text-lg text-gray-800">{review.customer_name}</h4>
          {businessName && <p className="text-sm text-gray-500">reviewed <span className="font-semibold text-green-600">{businessName}</span></p>}
        </div>
        <div className="text-sm text-gray-500">{timeAgo(review.created_at)}</div>
      </div>
      <div className="flex items-center my-2">
        <StarRating rating={review.rating} />
        {review.status === 'pending' && (
           <div className="ml-4 flex items-center text-xs text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
            <Icon name="pending" className="w-4 h-4 mr-1 text-yellow-600" />
            Pending Approval
          </div>
        )}
        {review.status === 'flagged' && (
           <div className="ml-4 flex items-center text-xs text-orange-800 bg-orange-100 px-2 py-1 rounded-full">
            <Icon name="flag" className="w-4 h-4 mr-1 text-orange-600" />
            Flagged for Review
          </div>
        )}
        {review.verified && review.status === 'approved' && (
          <div className="ml-4 flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
            <Icon name="verified" className="w-4 h-4 mr-1 text-green-600" />
            Verified Customer
          </div>
        )}
      </div>
      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
      {reply && (
          <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700">{businessName || 'Business'} replied:</h5>
            <p className="text-gray-600 mt-1 italic">"{reply.message}"</p>
          </div>
      )}
    </div>
  );
};

export default ReviewCard;