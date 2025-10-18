import React, { useState, useMemo } from 'react';
import type { Business, Review, Reply, User } from '../../types';
import StarRating from '../StarRating';
import ReviewCard from '../ReviewCard';
import Icon from '../Icon';
import LeaveReviewForm from '../LeaveReviewForm';
import { generateReviewSummary } from '../../services/geminiService';
import Spinner from '../Spinner';

interface BusinessProfilePageProps {
  business: Business;
  reviews: Review[];
  replies: Reply[];
  currentUser: User | null;
  onAddReview: (review: Omit<Review, 'id' | 'status' | 'created_at' | 'verified' | 'user_id' | 'moderation_score'>) => Promise<void>;
  onRequestAuth: () => void;
  onBack: () => void;
}

const BusinessProfilePage: React.FC<BusinessProfilePageProps> = ({ business, reviews, replies, currentUser, onAddReview, onRequestAuth, onBack }) => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const displayReviews = useMemo(() => {
    return reviews
      .filter(r => r.status === 'approved' || (r.user_id === currentUser?.id && (r.status === 'pending' || r.status === 'flagged')))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [reviews, currentUser]);

  const approvedReviewsForSummary = useMemo(() => reviews.filter(r => r.status === 'approved'), [reviews]);


  const handleLeaveReviewClick = () => {
    if (currentUser) {
      setIsReviewFormOpen(true);
    } else {
      onRequestAuth();
    }
  };

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    setAiSummary(null);
    const summary = await generateReviewSummary(approvedReviewsForSummary);
    setAiSummary(summary);
    setIsSummaryLoading(false);
  };
  
  const handleReviewSubmit = async (reviewData: Omit<Review, 'id' | 'status' | 'created_at' | 'verified' | 'user_id' | 'moderation_score'>) => {
    await onAddReview(reviewData);
    // Notification is now handled in App.tsx
  }

  return (
    <>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <Icon name="arrowLeft" className="w-5 h-5 mr-2" />
          Back to all businesses
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header Image */}
        <div className="h-64 bg-gray-200">
           <img className="w-full h-full object-cover" src={business.logo_url} alt={`${business.name} cover`} />
        </div>

        {/* Business Info */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-base font-semibold text-green-600">{business.category}</p>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-1">{business.name}</h1>
            </div>
            {business.verified && (
              <div className="mt-4 md:mt-0 flex items-center text-lg text-blue-700 bg-blue-100 px-4 py-2 rounded-lg font-semibold">
                <Icon name="shieldCheck" className="w-7 h-7 mr-2" />
                Verified Business
              </div>
            )}
          </div>
          <p className="text-md text-gray-500 mt-2 flex items-center">
            <Icon name="location" className="w-5 h-5 mr-2" />
            {business.address}
          </p>
           <p className="mt-4 text-gray-700 leading-relaxed max-w-3xl">{business.bio}</p>
        </div>
        
        {/* Verified Business Contact Info */}
        {business.verified && (
          <div className="border-t border-b border-gray-200 bg-gray-50 px-6 md:px-8 py-4">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-green-600 group">
                    <Icon name="website" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-green-500 transition-colors" />
                    <span className="truncate">{business.website.replace(/^https?:\/\//, '')}</span>
                </a>
                <a href={`mailto:${business.email}`} className="flex items-center text-gray-700 hover:text-green-600 group">
                    <Icon name="email" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-green-500 transition-colors" />
                    <span className="truncate">{business.email}</span>
                </a>
                <a href={`tel:${business.phone}`} className="flex items-center text-gray-700 hover:text-green-600 group">
                    <Icon name="phone" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-green-500 transition-colors" />
                    <span>{business.phone}</span>
                </a>
             </div>
          </div>
        )}

        {/* Rating and Review Button */}
        <div className="bg-white px-6 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-gray-800">{business.avg_rating.toFixed(1)}</div>
            <div>
              <StarRating rating={business.avg_rating} size="lg" />
              <p className="text-sm text-gray-600">Based on {business.total_reviews} reviews</p>
            </div>
          </div>
          <button 
            onClick={handleLeaveReviewClick}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            Leave a Review
          </button>
        </div>

        {/* Reviews Section */}
        <div className="p-6 md:p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h2>
          
          {/* AI Summary Section */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-800">Gemini AI Summary</h3>
              <button 
                onClick={handleGenerateSummary} 
                disabled={isSummaryLoading}
                className="bg-white border border-green-600 text-green-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSummaryLoading ? 'Generating...' : 'Regenerate'}
              </button>
            </div>
            {isSummaryLoading && <div className="mt-4"><Spinner/></div>}
            {aiSummary && <p className="mt-2 text-green-700">{aiSummary}</p>}
            {!aiSummary && !isSummaryLoading && (
              <p className="mt-2 text-gray-600 text-sm">Click 'Generate' to get an AI-powered summary of all reviews.</p>
            )}
          </div>

          {displayReviews.length > 0 ? (
            <div className="space-y-6">
              {displayReviews.map(review => {
                const reply = replies.find(r => r.review_id === review.id);
                return <ReviewCard key={review.id} review={review} businessName={business.name} reply={reply} />
              })}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg">
              <p className="text-gray-600">This business has no reviews yet.</p>
              <p className="text-sm text-gray-500 mt-1">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>

      {isReviewFormOpen && (
        <LeaveReviewForm
          businessId={business.id}
          businessName={business.name}
          currentUser={currentUser}
          onSubmit={handleReviewSubmit}
          onClose={() => setIsReviewFormOpen(false)}
        />
      )}
    </>
  );
};

export default BusinessProfilePage;