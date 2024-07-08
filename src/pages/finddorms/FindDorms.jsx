import React, { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button } from "../../components/buttons/Button";
import ListingBesideMapCards from "../../components/cards/ListingBesideMapCards";
import backgroundImage from "../../assets/FindBg.png";
import mapLogo from "../../assets/mapLogo.png";
import logoImage from "../../assets/LogoImage.png";
import housingMap from "../../assets/Housing-Map.png";
import FilterHome from "../../components/filterhome/FilterHome"; // Import the new FilterHome component

const FindDorms = () => {
  const [map, setMap] = useState(null);
  const [fromInput, setFromInput] = useState("");
  const [distance, setDistance] = useState(null);
  const [user, setUser] = useState(null);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("Price");
  const [selectedPlace, setSelectedPlace] = useState("Type of place");
  const [marker, setMarker] = useState(null);

  const universityCoordinates = {
    "Adamson University": [120.986, 14.6042],
    "Ateneo de Manila University": [121.0777, 14.6407],
    "De La Salle University": [120.9932, 14.5648],
    "De La Salle-College of Saint Benilde": [120.9951, 14.5636],
    "National University, Philippines": [120.9946, 14.6043],
    "Polytechnic University of the Philippines": [121.0108, 14.5979],
    "University of Santo Tomas": [120.9896, 14.6093],
    "University of the Philippines Diliman": [121.0657, 14.6537],
    "University of the Philippines Manila": [120.9918, 14.5806],
    "University of the Philippines System": [121.0657, 14.6537],
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGVybWFya3kiLCJhIjoiY2x5MW5lNTJzMHRkczJrcHo2NmprZzMwbSJ9.3vlFP5qZY7YBVQcjul9GIg";

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFromInput(parsedUser.university);
    }

    const initializeMap = () => {
      const initialCenter =
        storedUser && universityCoordinates[JSON.parse(storedUser).university]
          ? universityCoordinates[JSON.parse(storedUser).university]
          : [121.774, 12.8797];

      const mapInstance = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: initialCenter,
        zoom: 13,
        minZoom: 13,
      });

      mapInstance.addControl(new mapboxgl.NavigationControl());
      mapInstance.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );

      setMap(mapInstance);

      const initialMarkerElement = document.createElement("div");
      initialMarkerElement.style.width = "40px";
      initialMarkerElement.style.height = "40px";
      initialMarkerElement.style.backgroundImage = `url(${logoImage})`; // Use your mapLogo path here
      initialMarkerElement.style.backgroundSize = "cover";
      initialMarkerElement.style.cursor = "pointer";

      const initialMarker = new mapboxgl.Marker(initialMarkerElement)
        .setLngLat(initialCenter)
        .addTo(mapInstance);
      setMarker(initialMarker);

      fetch("http://localhost:5000/api/housing")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((house) => {
            const markerElement = document.createElement("div");
            markerElement.style.width = "35px";
            markerElement.style.height = "35px";
            markerElement.style.backgroundImage = `url(${housingMap})`;
            markerElement.style.backgroundSize = "cover";
            markerElement.style.cursor = "pointer";

            new mapboxgl.Marker(markerElement)
              .setLngLat([house.longitude, house.latitude])
              .addTo(mapInstance);
          });
        })
        .catch((error) => console.error("Error fetching housing data:", error));
    };

    if (!map) {
      initializeMap();
    }

    return () => map && map.remove();
  }, [map]);

  useEffect(() => {
    if (map && fromInput && universityCoordinates[fromInput]) {
      map.setMaxBounds(null);
      map.setZoom(12);
      marker.setLngLat(universityCoordinates[fromInput]);
      map.setCenter(universityCoordinates[fromInput]);
      map.setMaxBounds(map.getBounds());
    }
  }, [fromInput, map]);

  const handleSetWaypointFromInput = async () => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
  };

  const fetchRoute = async () => {
    const coordinates = universityCoordinates[fromInput];
    if (!coordinates) {
      alert("Please select a valid university.");
      return;
    }

    const route = {
      type: "LineString",
      coordinates: [
        [coordinates[0], coordinates[1]],
        [coordinates[0] + 0.01, coordinates[1] + 0.01],
      ],
    };

    setDistance(1.5);

    if (map.getSource("route")) {
      map.getSource("route").setData({
        type: "Feature",
        geometry: route,
      });
    } else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
          },
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
        },
      });
    }
  };

  const clearRoute = () => {
    setDistance(null);
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
  };

  return (
    <div className="w-full font-poppins pt-[10%] bg-blue-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome to PahingaU!</h2>
          {user && <p className="text-xl">Logged in as: {user.email}</p>}
        </div>

        <div className="mb-8">
          <div className="max-w-3xl mx-auto flex items-center bg-white rounded-full shadow-md">
            {user && (
              <select
                className="flex-grow px-6 py-3 text-xl text-[#1A1A1A] rounded-l-full focus:outline-none"
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
              >
                <option value="" disabled>
                  Select University
                </option>
                {Object.keys(universityCoordinates).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            <button
              className="mx-2 text-[#1A1A1A] hover:bg-gray-100 p-3 rounded-full"
              onClick={handleSetWaypointFromInput}
            >
              <img src={mapLogo} className="w-6 h-6" alt="Map Logo" />
            </button>
            <Button
              variant="solidm"
              onClick={fetchRoute}
              className="rounded-r-full"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Use the FilterHome component */}
        <FilterHome
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          showPriceDropdown={showPriceDropdown}
          setShowPriceDropdown={setShowPriceDropdown}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          showPlaceDropdown={showPlaceDropdown}
          setShowPlaceDropdown={setShowPlaceDropdown}
        />

        <div className="mb-16 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div
              id="map"
              className="h-[600px] w-full rounded-lg shadow-md"
            ></div>
          </div>
          <div
            className="lg:w-1/2 overflow-y-auto"
            style={{ maxHeight: "600px" }}
          >
            <ListingBesideMapCards />
          </div>
        </div>

        {distance !== null && (
          <div className="mt-4 p-4 bg-white text-black rounded-lg shadow-lg">
            <p>
              <strong>Distance:</strong> {distance.toFixed(2)} km
            </p>
            <Button variant="solidm" onClick={clearRoute} className="mt-2">
              Clear Route
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindDorms;
