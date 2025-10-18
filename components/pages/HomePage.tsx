import React, { useState } from 'react';
import type { Business, Review } from '../../types';
import BusinessCard from '../BusinessCard';
import ReviewCard from '../ReviewCard';
import Icon from '../Icon';

interface HomePageProps {
  businesses: Business[];
  reviews: Review[];
  onSelectBusiness: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ businesses, reviews, onSelectBusiness }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredBusinesses = businesses.slice(0, 6);
  const recentReviews = reviews.slice(0, 4);

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getBusinessName = (businessId: string) => {
      return businesses.find(b => b.id === businessId)?.name || 'a business';
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 bg-white rounded-lg shadow-md mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Find African Businesses You Can <span className="text-green-600">Trust</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Read and write verified customer reviews for businesses across Africa.
        </p>
        <div className="mt-8 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for a business, category or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
             <Icon name="search" className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Search Results / Featured Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {searchTerm ? 'Search Results' : 'Featured Businesses'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(searchTerm ? filteredBusinesses : featuredBusinesses).map(business => (
            <BusinessCard key={business.id} business={business} onSelectBusiness={onSelectBusiness} />
          ))}
        </div>
        {searchTerm && filteredBusinesses.length === 0 && (
             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No businesses found for "{searchTerm}".</p>
            </div>
        )}
      </section>

      {/* Recent Reviews Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Reviews</h2>
        <div className="space-y-6">
          {recentReviews.map(review => (
            <ReviewCard key={review.id} review={review} businessName={getBusinessName(review.business_id)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;