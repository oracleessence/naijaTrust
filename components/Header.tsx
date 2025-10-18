import React from 'react';
import Icon from './Icon';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogoClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  onDashboardClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogoClick, onLoginClick, onSignupClick, onLogout, onDashboardClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="text-green-600">
              <Icon name="shieldCheck" className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              afri<span className="text-green-600">TRUST</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.name.split(' ')[0]}!</span>
                {user.role === 'business_owner' && (
                  <button 
                    onClick={onDashboardClick}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                )}
                <button 
                  onClick={onLogout}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-semibold">Login</button>
                <button 
                  onClick={onSignupClick}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;