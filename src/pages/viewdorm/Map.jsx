import React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGVybWFya3kiLCJhIjoiY2x5MW5lNTJzMHRkczJrcHo2NmprZzMwbSJ9.3vlFP5qZY7YBVQcjul9GIg';

const Map = () => {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <div className="w-full rounded-lg overflow-hidden h-96">
                <Map
                    initialViewState={{
                        longitude: -122.4,
                        latitude: 37.8,
                        zoom: 14
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    <Marker longitude={-122.4} latitude={37.8} color="red" />
                </Map>
            </div>
        </div>
    );
};

export default Map;
