import React, { useState } from 'react';
import type { Business } from '../../types';
import Icon from '../Icon';

interface VerificationPanelProps {
    business: Business;
    onVerify: (businessId: string) => void;
}

const VerificationPanel: React.FC<VerificationPanelProps> = ({ business, onVerify }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = () => {
        if (!fileName) return;
        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            onVerify(business.id);
            setIsUploading(false);
            setFileName(null);
        }, 1500);
    };

    if (business.verified) {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg shadow-sm flex items-center">
                <Icon name="shieldCheck" className="w-6 h-6 mr-3" />
                <div>
                    <h3 className="font-bold">Business Verified</h3>
                    <p>Your business is verified, building more trust with customers.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Become a Verified Business</h2>
            <p className="text-gray-600 mb-4">Upload your business registration documents (e.g., CAC) to get the verified badge on your profile.</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer text-center font-semibold">
                    <Icon name="upload" className="w-5 h-5 inline-block mr-2" />
                    {fileName ? 'Change File' : 'Choose File'}
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
                </label>
                {fileName && <span className="text-gray-600 truncate">{fileName}</span>}
                <button
                    onClick={handleSubmit}
                    disabled={!fileName || isUploading}
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 flex items-center justify-center disabled:bg-green-400 disabled:cursor-not-allowed ml-auto"
                >
                    {isUploading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                        'Submit for Verification'
                    )}
                </button>
            </div>
        </div>
    );
};

export default VerificationPanel;
