import React from 'react'

const DarkButtonLong = ({children}, {className}) => {
  return (
    <div>
        <button type="button" className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md w-full hover:bg-indigo-700 transition duration-300 ${className}">
            {children}
        </button>
    </div>
  )
}

export default DarkButtonLong;
