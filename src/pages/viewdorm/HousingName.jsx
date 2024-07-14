import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const HousingName = () => {
    return (
        <div className="ml-[20%]">
            <h1 className="text-3xl font-bold">Bordeaux Getaway</h1>
            <ul className="mt-1 flex flex-col md:flex-row list-disc list-inside md:space-x-4 space-y-2 md:space-y-0 text-2 text-gray-500">
                <li className="flex items-center">
                    <StarBorderIcon style={{ fontSize: '20px', marginRight: '4px', color: 'black' }} />
                    <span className="text-black">5.0</span>
                </li>
                <li>
                    <span className="text-black underline">7 reviews</span>
                </li>
                <li>
                    <span className="underline">Sta. Mesa, Manila</span>
                </li>
            </ul>
         </div>
    );
};

export default HousingName;