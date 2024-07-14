import React from 'react';
import { useNavigate } from 'react-router-dom';
import locationIcon from '../../assets/locationIcon.png';
import approvalIcon from '../../assets/approvalIcon.png';

const FeaturedCards = ({ propertyImage, propertyName, address, price, period }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/Login');
  };

  return (
    <div
      className="relative w-[377px] h-[377px] rounded-[16px] overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(26, 26, 26, 0.2), rgba(26, 26, 26, 1)), url(${propertyImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleCardClick}
    >   
      <div className='bg-[#651FFF] w-[60px] h-[42px] flex mt-8 rounded-r-[100px]'>
        <img src={approvalIcon} alt="app" className="m-auto h-[20px] w-[20px]" />
      </div>
      <div className='flex font-montserrat mt-56 text-white flex-row justify-between align-middle'>
        <div className="flex flex-col justify-center align-middle text-sm m-auto">
          <h4 className='font-bold text-base'>{propertyName}</h4>
          <div className='flex flex-row gap-1 justify-start align-middle'>
            <img src={locationIcon} alt="loc" className="w-3 h-3 leading-4"></img>
            <p className="font-regular leading-4">{address}</p>
          </div>
        </div>
        <div className="bg-[#651FFF] px-2 w-[120px] rounded-xl m-auto">
          <h5 className="font-montserrat text-[11px] leading-8 font-bold">
            {price}<span className="font-normal"> / {period}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards;
