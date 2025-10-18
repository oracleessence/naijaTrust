
import React from 'react';
import type { Business } from '../types';
import StarRating from './StarRating';
import Icon from './Icon';

interface BusinessCardProps {
  business: Business;
  onSelectBusiness: (id: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onSelectBusiness }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelectBusiness(business.id)}
    >
      <img className="h-48 w-full object-cover" src={business.logo_url} alt={business.name} />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-green-600">{business.category}</p>
            {business.verified && (
                <div className="flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    <Icon name="shieldCheck" className="w-4 h-4 mr-1" />
                    Verified
                </div>
            )}
        </div>
        <h3 className="text-lg font-bold text-gray-800 truncate">{business.name}</h3>
        <p className="text-sm text-gray-500 flex items-center mt-1">
          <Icon name="location" className="w-4 h-4 mr-1"/>
          {business.address.split(',').slice(-2).join(', ').trim()}
        </p>
        <div className="flex items-center mt-3">
          <StarRating rating={business.avg_rating} size="sm" />
          <span className="text-gray-600 text-sm ml-2">({business.total_reviews} reviews)</span>
        </div>
        <div className="mt-auto pt-4">
             <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200">
                View Profile
             </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
