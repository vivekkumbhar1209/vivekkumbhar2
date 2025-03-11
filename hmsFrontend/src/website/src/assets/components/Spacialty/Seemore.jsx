import React, { useState } from 'react';
import Card from './Card'; 
import Popup from './Popup'; // Ensure this matches your file name
import { useNavigate } from "react-router-dom";

const Seemore = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', info: '', image: '' });

    const cards = [
        { image: '/Images/specialist/cardiologist.jpg', name: 'Cardiologist', info: 'Heart specialist' },
        { image: '/Images/specialist/neurologist.jpg', name: 'Neurologist', info: 'Skin specialist' },
        { image: '/Images/specialist/Orthopedic Surgeon.jpg', name: 'Orthopedic Surgeon', info: 'Bone and joint specialist' },
        { image: '/Images/specialist/pediatrician.jpg', name: 'Pediatrician', info: 'Child specialist' },
        { image: '/Images/specialist/oncology.jpg', name: 'Oncologist', info: 'Cancer specialist' },
        { image: '/Images/specialist/Gynecologist.jpg', name: 'Gynecologist', info: 'Women’s health specialist' },
        { image: '/Images/specialist/Endocrinologist.webp', name: 'Endocrinologist', info: 'Hormone and gland specialist' },
        { image: '/Images/specialist/psychiatrist.jpg', name: 'Psychiatrist', info: 'Social components of mental health' },
        { image: '/Images/specialist/ear-nose-throat.jpg', name: 'ENT (Ear, Nose, Throat)', info: 'Ear, nose, and throat treatments.' },
        { image: '/Images/specialist/Urology.jpeg', name: 'Urology', info: 'Kidney, bladder, and urinary tract care.' },
        { image: '/Images/specialist/Pulm.jpg', name: 'Pulmonology', info: 'Lung and respiratory system diseases.' },
        { image: '/Images/specialist/Rheumatology.jpg', name: 'Rheumatology', info: 'Autoimmune and joint disease' },
        { image: '/Images/specialist/Hematology.jpeg', name: 'Hematology', info: 'Blood disorders and treatment' },
        { image: '/Images/specialist/Plasticsurgery.jpg', name: 'Plastic Surgery', info: 'Cosmetic and reconstructive surgery' },
        { image: '/Images/specialist/Radiology.jpg', name: 'Radiology', info: 'Medical imaging and diagnostics' },
        { image: '/Images/specialist/Anesthesiologist.jpg', name: 'Anesthesiology', info: 'Pain management and anesthesia.' },
    ];

    const openPopup = (name, info, image) => {
        setPopupData({ title: name, info, image });
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className="p-2 gap-8 m-5 min-h-screen h-160 ">
                <h1 className="text-3xl font-bold text-center mb-6 mt-6">Our Speciality</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
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
            </div>
        </>
    );
}

export default Seemore;