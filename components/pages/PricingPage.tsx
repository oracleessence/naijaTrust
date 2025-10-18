import React from 'react';
import Icon from '../Icon';

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center space-x-3">
        <div className="flex-shrink-0">
            <Icon name="shieldCheck" className="w-5 h-5 text-green-500" />
        </div>
        <span className="text-gray-600">{children}</span>
    </li>
);

const PricingCard: React.FC<{ plan: string; price: string; description: string; features: string[]; isFeatured?: boolean }> = ({ plan, price, description, features, isFeatured }) => (
    <div className={`border rounded-lg p-8 flex flex-col ${isFeatured ? 'border-green-500 border-2' : 'border-gray-200'}`}>
        {isFeatured && <span className="text-xs font-bold uppercase tracking-wider bg-green-500 text-white px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
        <h3 className="text-2xl font-bold text-gray-800">{plan}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
        <div className="mt-6">
            <span className="text-5xl font-extrabold text-gray-900">{price}</span>
            <span className="text-base font-medium text-gray-500">/month</span>
        </div>
        <ul className="mt-8 space-y-4">
            {features.map((feature, i) => <Feature key={i}>{feature}</Feature>)}
        </ul>
        <button className={`mt-auto w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${isFeatured ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
            Get Started
        </button>
    </div>
);


const PricingPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
                Plans for Every Business
            </h1>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Join NaijaTrust to build your online reputation, connect with customers, and grow your business. Choose the plan that's right for you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <PricingCard
                    plan="Basic"
                    price="Free"
                    description="The essentials to get your business listed and start collecting reviews."
                    features={[
                        "Public business profile",
                        "Collect and display reviews",
                        "Basic review analytics",
                        "Standard support",
                    ]}
                />
                <PricingCard
                    plan="Verified"
                    price="₦10,000"
                    description="Unlock powerful tools to build trust and actively manage your reputation."
                    features={[
                        "Everything in Basic, plus:",
                        "Official 'Verified' badge",
                        "Display contact info (phone, email, website)",
                        "Respond to reviews",
                        "Advanced analytics & insights",
                        "Priority support",
                    ]}
                    isFeatured={true}
                />
            </div>
        </div>
    </div>
  );
};

export default PricingPage;
