import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnivCards = ({ univName, location, backgroundImage }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/Login');
  };

  return (
    <div
      className="relative align-middle w-[221px] h-[274px] rounded-[16px] overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(101, 31, 255, 1), rgba(26, 26, 26, 0.1), rgba(0, 0, 0, 0)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(101,31,255,1)] to-transparent p-4">
        <h2 className="text-white font-montserrat font-bold text-xl mb-2">{univName}</h2>
        <p className="text-white font-montserrat">{location}</p>
      </div>
    </div>
  );
};

export default UnivCards;
