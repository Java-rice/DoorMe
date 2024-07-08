import React from "react";
import BorderButton from '../buttons/BorderButton';
import DarkButton from '../buttons/DarkButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const SearchDorm = () => {
    return (
        <div className="w-full md:w-2/3 mx-auto flex gap-4 items-center bg-white rounded-full px-6 py-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
            <input 
                type="text" 
                placeholder="Where do you want to stay?" 
                className="placeholder:text-gray-800 w-1/2 bg-white border border-#E9E9E9 rounded-full text-gray-800 font-semibold px-4 py-2 flex-grow outline-none"
            />
            <BorderButton className="flex items-center justify-center">
                <FilterAltIcon className="mr-2" />
            </BorderButton>
            <DarkButton>Search</DarkButton>
        </div>
    );
};

export default SearchDorm;
