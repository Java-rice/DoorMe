import React, { useState } from 'react';
import ProfileOwner from "../../assets/profile_owner.png";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Bedroom from "../../assets/bedroom.png";
import GardenView from "../../assets/garden_icon.png";
import Wifi from '../../assets/wifi_icon.png';
import FreeWasher from '../../assets/wash_icon.png';
import CentralAirConditioning from '../../assets/central_air_icon.png';
import Refrigerator from '../../assets/refrigerator_icon.png';
import Kitchen from '../../assets/kitchen_icon.png';
import PetsAllowed from '../../assets/pet_icon.png';
import Dryer from '../../assets/dryer_icon.png';
import SecurityCamera from '../../assets/security_icon.png';
import Bicycle from '../../assets/bicycle_icon.png';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DarkButtonLong from '../../components/buttons/DarkButtonLong';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Notification from './Notification'; // Adjust the path as needed

const ListingInfo = () => {
    const [showAmenities, setShowAmenities] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [notification, setNotification] = useState(null);
    const [message, setMessage] = useState('');
    const [senderName, setSenderName] = useState('');

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const amenityIcons = {
        'Garden view': GardenView,
        Kitchen: Kitchen,
        Wifi: Wifi,
        'Pets allowed': PetsAllowed,
        'Free washer - in building': FreeWasher,
        Dryer: Dryer,
        'Central air conditioning': CentralAirConditioning,
        'Security cameras on property': SecurityCamera,
        Refrigerator: Refrigerator,
        Bicycles: Bicycle
    };

    const MAPBOX_TOKEN = 'pk.eyJ1IjoicGVybWFya3kiLCJhIjoiY2x5MW5lNTJzMHRkczJrcHo2NmprZzMwbSJ9.3vlFP5qZY7YBVQcjul9GIg';

    const handleNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleReserve = () => {
        handleNotification("Reservation is processed."); // Example notification, replace with actual logic
        // Implement further logic for reservation, e.g., API call
    };

    const handleSendMessage = () => {
        if (message && senderName) {
            handleNotification("Message sent to owner.");
            // Implement further logic for sending message, e.g., open message dialog
            console.log(`Message: ${message}, Sent by: ${senderName}`);
            // Reset message and senderName state after sending
            setMessage('');
            setSenderName('');
        } else {
            handleNotification("Please enter your name and message.");
        }
    };

    const handleScheduleVisit = () => {
        handleNotification("Schedule visit request processed."); // Example notification, replace with actual logic
        // Implement further logic for scheduling visit, e.g., show visit scheduling form
        console.log(`Scheduled visit for: ${startDate}`);
    };

    return (
        <div className="flex-auto max-w-6xl mx-auto mt-[30px] p-6">
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            <div className="flex justify-between items-center mb-4">
                <div className="w-auto pb-4 border-b-2 border-gray-300">
                    <div className="flex items-start">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold">Entire rental unit hosted by Ghazal</h1>
                            <p className="text-black-600 mt-2">2 guests · 1 bedroom · 1 bed · 1 bath</p>
                        </div>
                        <div className="ml-[294px]">
                            <img src={ProfileOwner} alt="Landlord" className="w-14 h-14 rounded-full border-4 border-[#651FFF]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                {/* Left Column */}
                <div className="mt-2">
                    <div className="flex mb-4 items-center">
                        <HomeOutlinedIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                        <div>
                            <h2 className="text-lg font-semibold">Entire home</h2>
                            <p className="text-gray-600">You’ll have the apartment to yourself</p>
                        </div>
                    </div>

                    <div className="flex mb-4 items-center">
                        <AutoAwesomeOutlinedIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                        <div>
                            <h2 className="text-lg font-semibold">Enhanced Clean</h2>
                            <p className="text-gray-600">The Landlord is committed to the DoorMe 5-Step Cleanliness Advocacy</p>
                        </div>
                    </div>

                    <div className="flex mb-4 items-center">
                        <DoorBackOutlinedIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                        <div>
                            <h2 className="text-lg font-semibold">Enhanced Security</h2>
                            <p className="text-gray-600">With available security guards</p>
                        </div>
                    </div>

                    <div className="flex mb-4 items-center">
                        <CalendarTodayOutlinedIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                        <div>
                            <h2 className="text-lg font-semibold">Flexible Renting Period Contract </h2>
                        </div>
                    </div>

                    <div className="mb-4 mt-14">
                        <p className="text-black">
                            {showMore ? (
                                <>
                                    Two Rides going to SM Megamall and Robinson
                                    <br />- One ride going to Pasig Public Market
                                    <br />- Near Taytay and Ortigas
                                    <br />- Near San Isidro Chapel
                                    <br />- Near Palawan Pawnshop ng Pinalad
                                    <br /><br />
                                    Note: 7km from Pasig Palengke to Santo Domingo Street (Dulo ng Pinalad) and another 7km from Santo Domingo Street (Dulo ng Pinalad) to Pasig Palengke
                                </>
                            ) : (
                                <>
                                    Two Rides going to SM Megamall and Robinson
                                    <br />- One ride going to Pasig Public Market
                                </>
                            )}
                            <br /><br />
                            {!showMore && (
                                <button
                                    className="text-black underline"
                                    onClick={toggleShowMore}
                                >
                                    Show more
                                    <ArrowForwardIosOutlinedIcon style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.5rem' }} />
                                </button>
                            )}
                            {showMore && (
                                <button
                                    className="text-black underline"
                                    onClick={toggleShowMore}
                                >
                                    Show less
                                    <KeyboardArrowUpOutlinedIcon className="w-2 h-2 mr-2" />
                                </button>
                            )}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                        {Object.entries(amenityIcons).slice(0, showAmenities ? undefined : 4).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                                <img src={value} alt={key} className="w-10 h-10 mr-2" />
                                <span>{key}</span>
                            </div>
                        ))}
                    </div>
                    {!showAmenities && (
                        <div className="mt-4">
                            <button
                                className="text-black underline"
                                onClick={() => setShowAmenities(true)}
                            >
                                Show all amenities
                                <ArrowForwardIosOutlinedIcon style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.5rem' }} />
                            </button>
                        </div>
                    )}
                    {showAmenities && (
                        <div className="mt-4">
                            <button
                                className="text-black underline"
                                onClick={() => setShowAmenities(false)}
                            >
                                Show less
                                <KeyboardArrowUpOutlinedIcon className="w-2 h-2 mr-2" />
                            </button>
                        </div>
                    )}

                    <div className="mt-8">
                        <img src={Bedroom} alt="bedroom" className="w-full h-auto object-cover rounded-md" />
                    </div>
                </div>

                {/* Right Column */}
                <div className="mt-2 p-4 border-2 border-[#D3D3D3] rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">$9,000 / month</h3>
                            <p className="text-gray-600">1 year contract</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center">
                                <StarBorderIcon style={{ color: 'gold', marginRight: '0.5rem' }} />
                                <span>4.98 (190 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Map
                            initialViewState={{
                                longitude: 121.064,
                                latitude: 14.555,
                                zoom: 15
                            }}
                            style={{ width: 300, height: 200 }}
                            mapStyle="mapbox://styles/mapbox/streets-v12"
                            mapboxAccessToken={MAPBOX_TOKEN}
                        >
                            <Marker longitude={121.064} latitude={14.555} color="red" />
                        </Map>
                    </div>
                    <div className="mt-4">
                        <label className="block text-black text-sm font-bold mb-2">
                            Date for Visit
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="border-2 border-[#D3D3D3] p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-black text-sm font-bold mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            className="border-2 border-[#D3D3D3] p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-black text-sm font-bold mb-2">
                            Message to Owner
                        </label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border-2 border-[#D3D3D3] p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <DarkButtonLong onClick={handleReserve}>Reserve</DarkButtonLong>
                    </div>
                    <div className="mt-2">
                        <DarkButtonLong onClick={handleSendMessage}>Message Owner</DarkButtonLong>
                    </div>
                    <div className="mt-2">
                        <DarkButtonLong onClick={handleScheduleVisit}>Schedule Visit</DarkButtonLong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingInfo;
