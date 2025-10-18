import React, { useState } from 'react';
import Icon from './Icon';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onLogin: (data: any) => void;
  onSignup: (data: any) => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

const SocialButton: React.FC<{ provider: 'google' | 'facebook' | 'apple', onClick: () => void }> = ({ provider, onClick }) => {
    const providerInfo = {
        google: { text: 'Continue with Google', icon: 'google' },
        facebook: { text: 'Continue with Facebook', icon: 'facebook' },
        apple: { text: 'Continue with Apple', icon: 'apple' },
    };
    const { text, icon } = providerInfo[provider];
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
        >
            <Icon name={icon} className="w-5 h-5 mr-3" />
            <span className="font-semibold text-sm">{text}</span>
        </button>
    );
}

const applyPhoneMask = (value: string): string => {
  if (value.includes('@')) {
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


const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLogin, onSignup, onSwitchMode }) => {
  const isLogin = mode === 'login';
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrPhone(applyPhoneMask(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ emailOrPhone });
    } else {
      onSignup({ emailOrPhone });
    }
  };
  
  const handleSocialLogin = () => {
      // For demo, all social logins act as a customer login
      onLogin({});
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Business Owner Portal'}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isLogin ? 'Log in as a customer to continue.' : 'Access your dashboard to manage your business profile and reviews.'}
        </p>

        <div className="space-y-3">
            <SocialButton provider="google" onClick={handleSocialLogin} />
            <SocialButton provider="facebook" onClick={handleSocialLogin} />
            <SocialButton provider="apple" onClick={handleSocialLogin} />
        </div>

        <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">Email or Phone Number</label>
            <input
              id="emailOrPhone"
              type="text"
              value={emailOrPhone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., +234 801 234 5678 or user@mail.com"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
          >
            {isLogin ? 'Login as Customer' : 'Login & View Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Are you a business owner?" : 'Not a business owner?'}
            <button 
              onClick={() => onSwitchMode(isLogin ? 'signup' : 'login')}
              className="font-semibold text-green-600 hover:underline ml-1"
            >
              {isLogin ? 'Login here' : 'Login as a customer'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;