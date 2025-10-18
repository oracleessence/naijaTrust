import React, { useMemo } from 'react';
import type { Business, Review, Reply } from '../../types';
import Icon from '../Icon';
import AnalyticsCard from '../dashboard/AnalyticsCard';
import VerificationPanel from '../dashboard/VerificationPanel';
import DashboardReviewCard from '../dashboard/DashboardReviewCard';

interface DashboardPageProps {
    business: Business;
    reviews: Review[];
    replies: Reply[];
    onAddReply: (reply: Omit<Reply, 'id' | 'created_at'>) => Promise<void>;
    onVerifyBusiness: (businessId: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ business, reviews, replies, onAddReply, onVerifyBusiness }) => {

    const analytics = useMemo(() => {
        const total = reviews.length;
        const pending = reviews.filter(r => r.status === 'pending').length;
        const flagged = reviews.filter(r => r.status === 'flagged').length;
        return { total, pending, flagged };
    }, [reviews]);
    
    const sortedReviews = useMemo(() => {
      return [...reviews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [reviews]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
                <p className="text-lg text-gray-600 mt-1">Manage your business profile for <span className="font-bold text-green-600">{business.name}</span></p>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard
                    title="Total Reviews"
                    value={analytics.total.toString()}
                    icon="reviews"
                    color="blue"
                />
                <AnalyticsCard
                    title="Average Rating"
                    value={business.avg_rating.toFixed(1)}
                    icon="star"
                    color="yellow"
                />
                <AnalyticsCard
                    title="Pending Approval"
                    value={analytics.pending.toString()}
                    icon="pending"
                    color="orange"
                />
                 <AnalyticsCard
                    title="Flagged Reviews"
                    value={analytics.flagged.toString()}
                    icon="flag"
                    color="red"
                />
            </div>

            {/* Verification Panel */}
            <VerificationPanel
                business={business}
                onVerify={onVerifyBusiness}
            />

            {/* Review Management */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Reviews</h2>
                {sortedReviews.length > 0 ? (
                     <div className="space-y-6">
                        {sortedReviews.map(review => {
                            const reply = replies.find(r => r.review_id === review.id);
                            return (
                                <DashboardReviewCard
                                    key={review.id}
                                    review={review}
                                    reply={reply}
                                    businessId={business.id}
                                    onAddReply={onAddReply}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-600">You have no reviews yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardPage;
