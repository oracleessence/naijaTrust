import React, { useState } from 'react';
import type { Review, Reply } from '../../types';
import StarRating from '../StarRating';
import Icon from '../Icon';
import ReplyForm from './ReplyForm';

interface DashboardReviewCardProps {
    review: Review;
    reply?: Reply;
    businessId: string;
    onAddReply: (reply: Omit<Reply, 'id' | 'created_at'>) => Promise<void>;
}

const statusStyles = {
    approved: { bg: 'bg-green-100', text: 'text-green-800', icon: 'verified' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'pending' },
    flagged: { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'flag' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: 'flag' }, // Placeholder icon
};

const DashboardReviewCard: React.FC<DashboardReviewCardProps> = ({ review, reply, businessId, onAddReply }) => {
    const [isReplying, setIsReplying] = useState(false);

    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        return "Today";
    };

    const style = statusStyles[review.status] || statusStyles.pending;

    return (
        <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-gray-800">{review.customer_name}</h4>
                    <div className="flex items-center mt-1">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-xs text-gray-500 ml-2">{timeAgo(review.created_at)}</span>
                    </div>
                </div>
                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                    <Icon name={style.icon} className="w-4 h-4 mr-1" />
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </div>
            </div>

            <p className="text-gray-600 my-3">{review.comment}</p>
            
            {review.moderation_score && (
                <p className="text-xs text-gray-500 mb-3">AI Moderation Score: <span className="font-semibold">{review.moderation_score}/100</span></p>
            )}

            {reply ? (
                <div className="mt-3 pt-3 border-t border-gray-200 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                         <h5 className="font-semibold text-gray-700 text-sm">Your reply:</h5>
                         <button className="text-xs text-blue-600 hover:underline font-semibold" onClick={() => setIsReplying(true)}>
                            <Icon name="edit" className="w-3 h-3 inline-block mr-1"/>
                            Edit
                         </button>
                    </div>
                    <p className="text-gray-600 mt-1 italic text-sm">"{reply.message}"</p>
                </div>
            ) : (
                 !isReplying && (
                    <button 
                        onClick={() => setIsReplying(true)}
                        className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center"
                    >
                        <Icon name="reply" className="w-4 h-4 mr-1"/>
                        Write a Reply
                    </button>
                )
            )}
            
            {isReplying && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <ReplyForm 
                        reviewId={review.id}
                        businessId={businessId}
                        initialMessage={reply?.message}
                        onSubmit={async (message) => {
                            // In a real app, you'd handle update vs create
                            await onAddReply({ review_id: review.id, business_id: businessId, message });
                            setIsReplying(false);
                        }}
                        onCancel={() => setIsReplying(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardReviewCard;
