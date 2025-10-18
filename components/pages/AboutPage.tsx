import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          About afri<span className="text-green-600">TRUST</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Our mission is to build a culture of trust and transparency in African commerce, one verified review at a time.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="Diverse team working together" 
          className="rounded-lg shadow-md w-full h-80 object-cover mb-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            afriTRUST was born from a simple idea: what if every African customer had a voice, and every business had a way to listen? In a vibrant market like ours, trust is the most valuable currency. Yet, finding reliable feedback can be challenging. That's where we come in.
          </p>
          <p>
            We are dedicated to creating a platform where authentic customer experiences are front and center. By verifying reviews through real transactions—like order IDs or phone numbers—we cut through the noise of fake or biased feedback. This ensures that when you read a review on afriTRUST, you're getting a genuine perspective.
          </p>
          
          <h2 className="font-bold text-2xl text-gray-800 mt-8">Our Commitment</h2>
          <ul>
            <li>
              <strong>Authenticity:</strong> We employ smart verification systems to ensure that reviews come from real customers who have interacted with the business.
            </li>
            <li>
              <strong>Fairness:</strong> We provide businesses with the tools to engage with feedback, reply to customers, and use insights to improve their services.
            </li>
            <li>
              <strong>Community:</strong> We are building a community of savvy shoppers and responsible business owners who are collectively raising the bar for customer service in Africa.
            </li>
          </ul>
          <p>
            Whether you're a customer looking for your next favorite restaurant or a business owner passionate about building a stellar reputation, afriTRUST is your partner in progress. Join us in building a more transparent and trustworthy marketplace for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;