import React, { useState } from 'react';
import Icon from '../Icon';
import type { Business } from '../../types';

interface ClaimPageProps {
  businesses: Business[]; // Unclaimed businesses
  onClaimRequest: (businessId: string) => void;
}

const ClaimResultCard: React.FC<{ business: Business; onClaim: (id: string) => void; }> = ({ business, onClaim }) => (
  <div className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-sm transition-shadow duration-200">
    <div>
      <h4 className="font-bold text-lg text-gray-800">{business.name}</h4>
      <p className="text-sm text-gray-500 flex items-center mt-1">
        <Icon name="location" className="w-4 h-4 mr-1"/>
        {business.address}
      </p>
    </div>
    <button 
      onClick={() => onClaim(business.id)}
      className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex-shrink-0 w-full sm:w-auto"
    >
      Claim This Business
    </button>
  </div>
);

const ClaimPage: React.FC<ClaimPageProps> = ({ businesses, onClaimRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const results = businesses.filter(b => 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Take Control of Your Business Profile
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Claiming your business on afriTRUST is the first step towards managing your online reputation, engaging with customers, and unlocking growth.
        </p>
        
        <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Ready to Get Started?</h2>
            <p className="mt-2 text-gray-600">Find your business and begin the claiming process today.</p>
            <form onSubmit={handleFormSubmit} className="mt-6 max-w-lg mx-auto flex gap-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter your business name or location..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon name="search" className="w-6 h-6" />
                    </div>
                </div>
                <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md flex-shrink-0">
                    Search
                </button>
            </form>
        </div>

        {hasSearched && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map(business => (
                  <ClaimResultCard key={business.id} business={business} onClaim={onClaimRequest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No unclaimed businesses found for "{searchTerm}".</p>
                <p className="text-sm text-gray-500 mt-1">Try a different search, or you can add your business soon.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ClaimPage;