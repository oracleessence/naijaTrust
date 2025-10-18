import React from 'react';

type View = 'home' | 'business' | 'dashboard' | 'about' | 'careers' | 'contact' | 'pricing' | 'terms' | 'privacy' | 'claim';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <li>
    <button onClick={onClick} className="hover:text-white transition-colors duration-200">
      {children}
    </button>
  </li>
);


const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">afriTRUST</h3>
            <p className="text-gray-400 text-sm">Verified reviews you can trust.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <ul className="space-y-1 text-gray-400">
              <FooterLink onClick={() => onNavigate('about')}>About Us</FooterLink>
              <FooterLink onClick={() => onNavigate('careers')}>Careers</FooterLink>
              <FooterLink onClick={() => onNavigate('contact')}>Contact</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">For Businesses</h3>
            <ul className="space-y-1 text-gray-400">
              <FooterLink onClick={() => onNavigate('claim')}>Claim Profile</FooterLink>
              <FooterLink onClick={() => onNavigate('pricing')}>Pricing</FooterLink>
              <FooterLink onClick={() => onNavigate('dashboard')}>Dashboard Login</FooterLink>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1 text-gray-400">
              <FooterLink onClick={() => onNavigate('terms')}>Terms of Service</FooterLink>
              <FooterLink onClick={() => onNavigate('privacy')}>Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} afriTRUST. All rights reserved. Made with 💚 in Africa.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;