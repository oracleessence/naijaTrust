import React, { useState } from 'react';

interface ReplyFormProps {
    reviewId: string;
    businessId: string;
    initialMessage?: string;
    onSubmit: (message: string) => Promise<void>;
    onCancel: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, onCancel, initialMessage = '' }) => {
    const [message, setMessage] = useState(initialMessage);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        setIsSubmitting(true);
        await onSubmit(message);
        // isSubmitting will be false when the parent closes the form
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="reply" className="block text-sm font-medium text-gray-700">
                {initialMessage ? 'Edit your reply' : 'Your reply'}
            </label>
            <textarea
                id="reply"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Write your public reply here..."
                required
                disabled={isSubmitting}
            />
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-semibold disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="px-4 py-1 bg-green-600 text-white rounded-md shadow hover:bg-green-700 text-sm font-semibold disabled:bg-green-400"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Reply'}
                </button>
            </div>
        </form>
    );
};

export default ReplyForm;
