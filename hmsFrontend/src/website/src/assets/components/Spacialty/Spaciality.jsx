
import React, { useState } from 'react';
import Card from './Card';
import Popup from './popup'; // Ensure this matches your file name
import { useNavigate } from "react-router-dom";
import cardiologist from '../../../../Images/specialist/cardiologist.jpg'
import neurologist from '../../../../Images/specialist/neurologist.jpg'
import orthopedic from '../../../../Images/specialist/Orthopedic Surgeon.jpg'
import pediatrician from '../../../../Images/specialist/pediatrician.jpg'
import oncology from '../../../../Images/specialist/oncology.jpg'
import gynecologist from '../../../../Images/specialist/gynecologist.jpg'
import endocrinologist from '../../../../Images/specialist/Endocrinologist.webp'
import psychiatrist from '../../../../Images/specialist/Psychiatrist.jpg'

const Speciality = () => { // Corrected spelling here +++++
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', info: '', image: '' });

    const cards = [
        { image: cardiologist, name: 'Cardiologist', info: 'Heart specialist' },
        { image: neurologist, name: 'Neurologist', info: 'Skin specialist' },
        { image: orthopedic, name: 'Orthopedic Surgeon', info: 'Bone and joint specialist' },
        { image: pediatrician, name: 'Pediatrician', info: 'Child specialist' },
        { image: oncology, name: 'Oncologist', info: 'Cancer specialist' },
        { image: gynecologist, name: 'Gynecologist', info: 'Women’s health specialist' },
        { image: endocrinologist, name: 'Endocrinologist', info: 'Hormone and gland specialist' },
        { image: psychiatrist, name: 'Psychiatrist', info: 'Social components of mental health' }, // Corrected info
    ];

    const openPopup = (name, info, image) => {
        setPopupData({ title: name, info, image });
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const navigate = useNavigate(); // Define navigate using useNavigate

    const handleButtonClick = () => {
        navigate("/Seemore");
    };

    return (
        <>
            <div className="p-4 bg-gray-150/80 mx-[30px] max-w-screen-lg mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6 mt-6">Specialities</h1>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            image={card.image}
                            name={card.name}
                            info={card.info}
                            onImageClick={() => openPopup(card.name, card.info, card.image)} // Open popup on image click
                        />
                    ))}
                </div>

                {/* Popup */}
                {isPopupOpen && (
                    <Popup
                        title={popupData.title}
                        info={popupData.info}
                        image={popupData.image}
                        onClose={closePopup}
                    />
                )}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleButtonClick}
                        className="bg-purple-900 text-white px-4 py-3 mb-6 rounded hover:bg-purple-500 transition"
                    >
                        See More
                    </button>
                </div>
            </div>


        </>
    );
}

export default Speciality; 