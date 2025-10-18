import React from 'react';
import Icon from '../Icon';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="p-8 md:p-12 bg-green-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">Get in Touch</h1>
                <p className="mb-8 text-green-100">
                    Have a question, suggestion, or need support? We'd love to hear from you. Reach out to us, and we'll get back to you as soon as possible.
                </p>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <Icon name="location" className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold">Our Office</h3>
                            <p className="text-green-200">123 Trust Avenue, Ikoyi, Lagos, Nigeria</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Icon name="email" className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold">Email Us</h3>
                            <a href="mailto:support@naijatrust.com" className="text-green-200 hover:text-white">support@naijatrust.com</a>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Icon name="phone" className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold">Call Us</h3>
                            <a href="tel:+2348012345678" className="text-green-200 hover:text-white">+234 (0) 801 234 5678</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required></textarea>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition-colors duration-200">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;
