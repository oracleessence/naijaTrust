import React, { useEffect } from 'react';
import Icon from './Icon';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const iconName = type === 'success' ? 'shieldCheck' : 'shieldCheck'; // Placeholder for an error icon

  return (
    <div className={`fixed top-24 right-4 sm:right-6 lg:right-8 w-auto max-w-sm p-4 rounded-lg shadow-lg text-white ${bgColor} z-50 animate-fade-in-down`}>
      <div className="flex items-center">
        <Icon name={iconName} className="w-6 h-6 mr-3" />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:bg-white/20 rounded-full p-1 focus:outline-none">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
