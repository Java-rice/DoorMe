import React, { useState, useEffect } from "react";
import axios from "axios";
// Example usage in React component

const ListingBesideMapCards = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch housing data from API endpoint
    axios
      .get("http://localhost:5000/api/housing")
      .then((response) => {
        setListings(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching housing data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      {listings.map((listing, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-4"
        >
          <div className="md:w-1/3">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
          <div className="p-4 md:w-2/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
              <p className="text-gray-600 mb-2">{listing.details}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{listing.rating}</span>
                <span className="text-gray-500 ml-1">
                  ({listing.reviews} reviews)
                </span>
              </div>
              <div className="font-bold text-lg">{listing.price}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListingBesideMapCards;
