import React from 'react';

const StrongBorderButton = ({ onClick, children, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors ${
        isActive ? 'border-black bg-black text-white' : 'border-black text-black bg-white hover:bg-black hover:text-white'
      }`}
      style={{ transition: 'background-color 0.3s, color 0.3s' }}
    >
      {children}
    </button>
  );
};

export default StrongBorderButton;
