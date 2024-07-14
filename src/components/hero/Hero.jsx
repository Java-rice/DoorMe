import React from 'react';
import KeywordSearch from '../search/KeywordSearch';

const Hero = ({ backgroundImage }) => {
    return (
        <div className="w-full min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="w-3/5 mx-auto text-white flex flex-col gap-5 justify-center items-center min-h-screen text-wrap">
                <button className="mb-4 text-white border border-white bg-transparent py-2 px-4 rounded-full hover:bg-transparent">
                    DISCOVER WONDERS HERE
                </button>
                <h1 className="font-montserrat text-6xl font-semibold leading-[78px] text-center">
                    Discover a Dorm You'll Love to Live
                </h1>
                <KeywordSearch />
            </div>
        </div>
    );
};

export default Hero;
