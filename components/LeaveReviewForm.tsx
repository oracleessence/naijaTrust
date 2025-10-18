import React, { useState, useEffect } from 'react';
import type { Review, User } from '../types';
import StarRating from './StarRating';
import Spinner from './Spinner';

interface LeaveReviewFormProps {
  businessId: string;
  businessName: string;
  currentUser: User | null;
  onSubmit: (review: Omit<Review, 'id' | 'status' | 'created_at' | 'verified' | 'user_id' | 'moderation_score'>) => Promise<void>;
  onClose: () => void;
}

const applyPhoneMask = (value: string): string => {
  if (/[a-zA-Z@._-]/.test(value)) {
    return value;
  }

  let digits = value.replace(/[^\d]/g, '');
  
  if (value.startsWith('+')) {
    if (digits.startsWith('234')) {
      digits = digits.slice(3);
    }
  } else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  
  digits = digits.slice(0, 10);

  if (digits.length === 0) {
    return value.startsWith('+') ? '+' : '';
  }

  let masked = '+234';
  if (digits.length > 0) {
    masked += ' ' + digits.slice(0, 3);
  }
  if (digits.length > 3) {
    masked += ' ' + digits.slice(3, 6);
  }
  if (digits.length > 6) {
    masked += ' ' + digits.slice(6, 10);
  }
  
  return masked;
};

const LeaveReviewForm: React.FC<LeaveReviewFormProps> = ({ businessId, businessName, currentUser, onSubmit, onClose }) => {
  const [customer_name, setCustomerName] = useState('');
  const [verification_id, setVerificationId] = useState(''); // Can be phone or order ID
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
    }
  }, [currentUser]);

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationId(applyPhoneMask(e.target.value));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !customer_name || !comment || !verification_id) {
      setError('Please fill out all fields and select a rating.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    const strippedVerificationId = verification_id.replace(/\s/g, '');
    const isPhone = /^\+?234\d{10}$/.test(strippedVerificationId) || /^\d{11}$/.test(strippedVerificationId);

    try {
      await onSubmit({
        business_id: businessId,
        customer_name,
        customer_phone: isPhone ? strippedVerificationId : undefined,
        order_id: !isPhone ? verification_id : undefined,
        rating,
        comment,
      });
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative max-h-screen overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled={isSubmitting}>&times;</button>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Write a review for</h2>
        <h3 className="text-xl font-semibold mb-6 text-green-600">{businessName}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset disabled={isSubmitting}>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Your rating</label>
              <StarRating rating={rating} setRating={setRating} size="lg" />
            </div>
            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                id="customer_name"
                type="text"
                value={customer_name}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-100"
                readOnly={!!currentUser}
                required
              />
            </div>
            <div>
              <label htmlFor="verification_id" className="block text-sm font-medium text-gray-700">Phone Number or Order ID</label>
              <input
                id="verification_id"
                type="text"
                value={verification_id}
                onChange={handleVerificationChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., +234 801 234 5678 or OrderID123"
                required
              />
              <p className="text-xs text-gray-500 mt-1">We use this to verify your review with the business.</p>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                id="comment"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Tell us about your experience..."
                required
              />
            </div>
          </fieldset>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end pt-4 space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 flex items-center justify-center w-36 disabled:bg-green-400" disabled={isSubmitting}>
              {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveReviewForm;