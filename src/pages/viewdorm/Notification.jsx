// src/components/Notification.js
import React from 'react';

const Notification = ({ message, onClose }) => {
    return (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-md shadow-lg flex items-center space-x-2">
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-4 text-white hover:text-gray-400"
            >
                ✕
            </button>
        </div>
    );
};

export default Notification;
