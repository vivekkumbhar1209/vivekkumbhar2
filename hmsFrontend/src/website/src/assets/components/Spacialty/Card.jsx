
// Card.js
import React from 'react';

const Card = ({ image, name, info, onImageClick }) => {
    return (
        <div className=" p-4 text-center cursor-pointer">
            <div className="flex flex-col items-center   ">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-24 h-24 rounded-full object-cover mb-2 cursor-pointer transition-transform transform hover:scale-120" 
                    onClick={onImageClick} // Open popup on image click
                />
                <h2 className="text-xl font-semibold  duration-200 hover:text-blue-500">{name}</h2>
                <p className="text-gray-600 transition-colors duration-200 hover:text-blue-800">{info}</p>
            </div>
        </div>
    );
};

export default Card;