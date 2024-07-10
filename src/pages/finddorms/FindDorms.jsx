import React, { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ListingBesideMapCards from "../../components/cards/ListingBesideMapCards";
import housingMap from "../../assets/Housing-Map.png";
import universityMap from "../../assets/University-Map.png";
import distanceMap from "../../assets/Distance-Map.png";

const FindDorms = () => {
  const [map, setMap] = useState(null);
  const [fromInput, setFromInput] = useState("");
  const [user, setUser] = useState(null);
  const [marker, setMarker] = useState(null);
  const [initialCenter, setInitialCenter] = useState([121.0108, 14.5979]); // Default center
  const [universities, setUniversities] = useState({});

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGVybWFya3kiLCJhIjoiY2x5MW5lNTJzMHRkczJrcHo2NmprZzMwbSJ9.3vlFP5qZY7YBVQcjul9GIg";

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFromInput(parsedUser.university);
    }

    // Fetch universities data
    axios
      .get("http://localhost:5000/api/universities")
      .then((response) => {
        const fetchedUniversities = {};
        response.data.forEach((university) => {
          fetchedUniversities[university.name] = [
            university.longitude,
            university.latitude,
          ];
        });
        setUniversities(fetchedUniversities);
      })
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

  useEffect(() => {
    if (map && fromInput && universities[fromInput]) {
      const newCenter = universities[fromInput];
      map.setMaxBounds(null);
      map.setZoom(13);
      marker.setLngLat(newCenter);
      map.setCenter(newCenter);
    }
  }, [fromInput, map, universities, marker]);

  useEffect(() => {
    const initializeMap = () => {
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
      initialMarkerElement.style.backgroundImage = `url(${universityMap})`;
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

            const marker = new mapboxgl.Marker(markerElement)
              .setLngLat([house.longitude, house.latitude])
              .addTo(mapInstance);

            marker.getElement().addEventListener("click", () => {
              const currentCenter = mapInstance.getCenter();
              fetchRoute(
                mapInstance,
                [currentCenter.lng, currentCenter.lat],
                [house.longitude, house.latitude]
              );
            });
          });
        })
        .catch((error) => console.error("Error fetching housing data:", error));
    };

    if (!map) {
      initializeMap();
    }

    return () => map && map.remove();
  }, [initialCenter, map]);

  const fetchRoute = async (mapInstance, fromCoordinates, toCoordinates) => {
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates[0]},${fromCoordinates[1]};${toCoordinates[0]},${toCoordinates[1]}?geometries=geojson&steps=true&overview=full&access_token=${mapboxgl.accessToken}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error("No routes found");
      }

      // Extract the route geometry and distance from the response
      const route = data.routes[0].geometry;
      const distance = data.routes[0].distance; // distance in meters

      // Remove existing route layer if it exists
      if (mapInstance.getLayer("route")) {
        mapInstance.removeLayer("route");
      }

      // Remove existing route source if it exists
      if (mapInstance.getSource("route")) {
        mapInstance.removeSource("route");
      }

      // Add the route source and layer to the map
      mapInstance.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: route,
        },
      });

      mapInstance.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
        },
      });

      // Display the distance in a popup on the map
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(toCoordinates)
        .setHTML(`<p>Distance: ${(distance / 1000).toFixed(2)} km</p>`)
        .addTo(mapInstance);
    } catch (error) {
      console.error("Error fetching the route:", error);
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
                {Object.keys(universities).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

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
      </main>
    </div>
  );
};

export default FindDorms;
