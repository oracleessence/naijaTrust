import React from 'react';
import Icon from '../Icon';

interface AnalyticsCardProps {
    title: string;
    value: string;
    icon: string;
    color: 'blue' | 'yellow' | 'orange' | 'red' | 'green';
}

const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
};

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon, color }) => {
    const { bg, text } = colorClasses[color];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className={`p-3 rounded-full ${bg} ${text}`}>
                <Icon name={icon} className="w-7 h-7" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

export default AnalyticsCard;
