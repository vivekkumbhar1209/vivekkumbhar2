import React from 'react';

const Popup = ({ title, info, onClose, image }) => {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Image */}
                {image && <img className="object-cover w-full h-40 rounded mb-4" src={image} alt="Popup" />}

                {/* Title */}
                <h2 className="text-xl font-bold mb-2">{title}</h2>

                {/* Info Text */}
                <p className="mb-4 text-gray-700">{info}</p>

                {/* Close Button */}
                {/* Removed the duplicate close button */}
            </div>
        </div>
    );
};

export default Popup;