import React from 'react';
import Icon from '../Icon';

const JobOpening: React.FC<{ title: string; location: string; type: string }> = ({ title, location, type }) => (
  <div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-200">
    <div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <div className="flex items-center text-gray-500 mt-1 text-sm">
        <div className="flex items-center mr-4">
          <Icon name="location" className="w-4 h-4 mr-1" /> {location}
        </div>
        <div className="flex items-center">
          <Icon name="pending" className="w-4 h-4 mr-1" /> {type}
        </div>
      </div>
    </div>
    <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
      Apply Now
    </button>
  </div>
);

const CareersPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Join Our Team at Naija<span className="text-green-600">Trust</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Help us build the future of trusted commerce in Nigeria. We're looking for passionate, innovative people to join our mission.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1521737852577-6848d7831031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="A modern and collaborative office environment" 
          className="rounded-lg shadow-md w-full h-80 object-cover mb-10"
        />

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Current Openings</h2>

        <div className="space-y-6">
          <JobOpening title="Senior Frontend Engineer" location="Lagos (Remote-friendly)" type="Full-time" />
          <JobOpening title="Lead Product Manager" location="Abuja" type="Full-time" />
          <JobOpening title="Business Development Associate" location="Port Harcourt" type="Contract" />
          <JobOpening title="Digital Marketing Specialist" location="Lagos" type="Full-time" />
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-800">Don't see your role?</h3>
            <p className="text-gray-600 mt-2">
                We're always on the lookout for exceptional talent. If you're passionate about what we do, send your resume to us.
            </p>
            <a href="mailto:careers@naijatrust.com" className="mt-4 inline-block bg-white border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200">
                Contact Us
            </a>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
