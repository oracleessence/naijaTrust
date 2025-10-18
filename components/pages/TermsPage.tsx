import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>
            Welcome to afriTRUST! These Terms of Service ("Terms") govern your use of the afriTRUST website and services (collectively, the "Service"), operated by afriTRUST Ltd. ("us", "we", or "our").
          </p>

          <h2 className="font-bold text-2xl text-gray-800 pt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. This is a demo application, and these terms are for illustrative purposes only.
          </p>

          <h2 className="font-bold text-2xl text-gray-800 pt-4">2. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          
          <h2 className="font-bold text-2xl text-gray-800 pt-4">3. Content</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness. By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
          </p>

          <h2 className="font-bold text-2xl text-gray-800 pt-4">4. Prohibited Uses</h2>
          <p>
            You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the services, or the general business of afriTRUST Ltd.
          </p>
          
          <h2 className="font-bold text-2xl text-gray-800 pt-4">5. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <h2 className="font-bold text-2xl text-gray-800 pt-4">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of our operating jurisdiction, without regard to its conflict of law provisions.
          </p>

          <h2 className="font-bold text-2xl text-gray-800 pt-4">7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2 className="font-bold text-2xl text-gray-800 pt-4">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@afritrust.com" className="text-green-600 hover:underline">legal@afritrust.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;