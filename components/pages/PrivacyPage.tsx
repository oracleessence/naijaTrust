import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>
                NaijaTrust Ltd. ("us", "we", or "our") operates the NaijaTrust website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. This is a demo application, and this policy is for illustrative purposes only.
            </p>

            <h2 className="font-bold text-2xl text-gray-800 pt-4">1. Information Collection and Use</h2>
            <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3>Types of Data Collected</h3>
            <ul>
                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, Name, Phone number.</li>
                <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data").</li>
            </ul>

            <h2 className="font-bold text-2xl text-gray-800 pt-4">2. Use of Data</h2>
            <p>
                NaijaTrust Ltd. uses the collected data for various purposes:
            </p>
            <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
            </ul>

            <h2 className="font-bold text-2xl text-gray-800 pt-4">3. Data Security</h2>
            <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2 className="font-bold text-2xl text-gray-800 pt-4">4. Your Data Protection Rights</h2>
            <p>
                You have certain data protection rights. NaijaTrust Ltd. aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
            </p>
            
            <h2 className="font-bold text-2xl text-gray-800 pt-4">5. Changes to This Privacy Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="font-bold text-2xl text-gray-800 pt-4">6. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@naijatrust.com" className="text-green-600 hover:underline">privacy@naijatrust.com</a>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
