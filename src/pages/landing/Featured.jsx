import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StrongBorderButton from '../../components/buttons/StrongBorderButton.jsx';
import FeaturedCards from '../../components/cards/FeaturedCards.jsx';
import f1 from '../../assets/f1.png';
import f2 from '../../assets/f2.png';
import f3 from '../../assets/f3.png';
import f4 from '../../assets/f4.png';
import f5 from '../../assets/f5.png';
import f6 from '../../assets/f6.png';
import f7 from '../../assets/f7.png';
import f8 from '../../assets/f8.png';
import f9 from '../../assets/f9.png';
import f10 from '../../assets/f10.png';
import f11 from '../../assets/f11.png';
import f12 from '../../assets/f12.png';
import f13 from '../../assets/f13.jpg';
import f14 from '../../assets/f14.jpg';
import f15 from '../../assets/f15.jpg';
import f16 from '../../assets/f16.jpg';
import f17 from '../../assets/f17.jpg';
import f18 from '../../assets/f18.jpg';

const Featured = () => {
  const [currentFilter, setCurrentFilter] = useState('All Properties');
  const navigate = useNavigate();

  const properties = {
    'All Properties': [
        { propertyImage: f11, propertyName: "Loyola Heights", address: "Katipunan Ave, Loyola Heights, Quezon City", price: 2400, period: "monthly" },
        { propertyImage: f6, propertyName: "Metro Living Condos", address: "333 España Boulevard, Sampaloc, Manila", price: 5600, period: "monthly" },
        { propertyImage: f3, propertyName: "Golden Heights", address: "789 Taft Avenue, Espana, Manila", price: 5200, period: "monthly" },
        { propertyImage: f15, propertyName: "Urban Oasis Towers", address: "789 EDSA, Mandaluyong City", price: 7200, period: "monthly" },
        { propertyImage: f9, propertyName: "Harbor View Dormitory", address: "789 Pedro Gil Street, Ermita, Manila", price: 2100, period: "monthly" },
        { propertyImage: f16, propertyName: "Bayshore Residences", address: "1011 Entertainment City, Parañaque City", price: 7300, period: "monthly" },
    ],
    'Dorms': [
        { propertyImage: f7, propertyName: "Paupahan ni Boss", address: "123 Taft Avenue, Malate, Manila", price: 2000, period: "monthly" },
        { propertyImage: f8, propertyName: "Metro Haven", address: "456 España Boulevard, Sampaloc, Manila", price: 2200, period: "monthly" },
        { propertyImage: f9, propertyName: "Harbor View Dormitory", address: "789 Pedro Gil Street, Ermita, Manila", price: 2100, period: "monthly" },
        { propertyImage: f10, propertyName: "Cityscape Residences", address: "1011 Quezon Boulevard, Quiapo, Manila", price: 2300, period: "monthly" },
        { propertyImage: f11, propertyName: "Loyola Heights", address: "Katipunan Ave, Loyola Heights, Quezon City", price: 2400, period: "monthly" },
        { propertyImage: f12, propertyName: "Makati Skyline Dorms", address: "1315 Makati Avenue, Makati City", price: 2500, period: "monthly" },
    ],
    'Apartments': [
        { propertyImage: f1, propertyName: "Sunrise Residences", address: "123 Malate Street, Malate, Manila", price: 5000, period: "monthly" },
        { propertyImage: f2, propertyName: "Bayview Towers", address: "456 Roxas Boulevard, Ermita, Manila", price: 5500, period: "monthly" },
        { propertyImage: f3, propertyName: "Golden Heights", address: "789 Taft Avenue, Espana, Manila", price: 5200, period: "monthly" },
        { propertyImage: f4, propertyName: "Harbor View Residences", address: "1011 Pedro Gil Street, Santa Ana, Manila", price: 5300, period: "monthly" },
        { propertyImage: f5, propertyName: "Cityscape Suites", address: "222 Sampaloc Street, Sampaloc, Manila", price: 5400, period: "monthly" },
        { propertyImage: f6, propertyName: "Metro Living Condos", address: "333 España Boulevard, Sampaloc, Manila", price: 5600, period: "monthly" },
    ],
    'Condo': [
        { propertyImage: f13, propertyName: "The Skyview Residences", address: "123 Makati Avenue, Makati City", price: 8700, period: "monthly" },
        { propertyImage: f14, propertyName: "Harborfront Suites", address: "456 Roxas Boulevard, Pasay City", price: 9000, period: "monthly" },
        { propertyImage: f15, propertyName: "Urban Oasis Towers", address: "789 EDSA, Mandaluyong City", price: 9800, period: "monthly" },
        { propertyImage: f16, propertyName: "Bayshore Residences", address: "1011 Entertainment City, Parañaque City", price: 9200, period: "monthly" },
        { propertyImage: f17, propertyName: "Cityscape Heights", address: "222 Ortigas Avenue, Pasig City", price: 8500, period: "monthly" },
        { propertyImage: f18, propertyName: "Metro Living Towers", address: "333 Quezon Avenue, Quezon City", price: 9500, period: "monthly" },
    ]
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleCardClick = () => {
    navigate('/login');
  };

  const handleSeeAllListingsClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="bg-white py-8 px-[10%]">
      <div className="w-full pt-20 pb-10 flex flex-col gap-7 justify-center items-center ">
        <div className='flex flex-col gap-1 justify-center items-center'>
          <h1 className="font-montserrat text-center text-4xl font-semibold">
            Featured Properties
          </h1>
          <p className="font-montserrat text-center text-xl leading-[32px]">
            Find the perfect housing for you.
          </p>
        </div>
      </div>
      <div className="flex gap-4 justify-center mb-2">
        <StrongBorderButton
          onClick={() => handleFilterChange('All Properties')}
          isActive={currentFilter === 'All Properties'}
        >
          All Properties
        </StrongBorderButton>
        <StrongBorderButton
          onClick={() => handleFilterChange('Dorms')}
          isActive={currentFilter === 'Dorms'}
        >
          Dorms
        </StrongBorderButton>
        <StrongBorderButton
          onClick={() => handleFilterChange('Apartments')}
          isActive={currentFilter === 'Apartments'}
        >
          Apartments
        </StrongBorderButton>
        <StrongBorderButton
          onClick={() => handleFilterChange('Condo')}
          isActive={currentFilter === 'Condo'}
        >
          Condo
        </StrongBorderButton>
      </div>
      <div className="text-center pt-10 pb-8 gap-10 justify-center items-center flex flex-row flex-wrap mt-8">
        {properties[currentFilter].map((property, index) => (
          <div
            onClick={handleCardClick}
            key={index}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <FeaturedCards
              propertyImage={property.propertyImage}
              propertyName={property.propertyName}
              address={property.address}
              price={property.price}
              period={property.period}
            />
          </div>
        ))}
      </div>
      <div className="w-full pt-10 pb-10 flex flex-col gap-7 justify-center items-center ">
        <button
          onClick={handleSeeAllListingsClick}
          className="bg-white text-[#1A1A1A] font-bold px-6 py-3 rounded-md hover:bg-purple-700 hover:text-white transition-colors"
        >
          See All Listings
        </button>
      </div>
    </div>
  );
};

export default Featured;
