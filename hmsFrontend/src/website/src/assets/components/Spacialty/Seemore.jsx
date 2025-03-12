import React, { useState } from 'react';
import Card from './Card';
import Popup from './Popup'; // Ensure this matches your file name
import { useNavigate } from "react-router-dom";
import image1 from '../../../../Images/specialist/cardiologist.jpg'
import image2 from '../../../../Images/specialist/neurologist.jpg'
import image3 from '../../../../Images/specialist/Orthopedic Surgeon.jpg'
import image4 from '../../../../Images/specialist/pediatrician.jpg'
import image5 from '../../../../Images/specialist/oncology.jpg'
import image6 from '../../../../Images/specialist/Gynecologist.jpg'
import image7 from '../../../../Images/specialist/Endocrinologist.webp'
import image8 from '../../../../Images/specialist/psychiatrist.jpg'
import image9 from '../../../../Images/specialist/ear-nose-throat.jpg'
import image10 from '../../../../Images/specialist/Urology.jpeg'
import image11 from '../../../../Images/specialist/Pulm.jpg'
import image12 from '../../../../Images/specialist/Rheumatology.jpg'
import image13 from '../../../../Images/specialist/Hematology.jpeg'
import image14 from '../../../../Images/specialist/Plasticsurgery.jpg'
import image15 from '../../../../Images/specialist/Radiology.jpg'
import image16 from '../../../../Images/specialist/Anesthesiologist.jpg'

const Seemore = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', info: '', image: '' });

    const cards = [
        { image: image1, name: 'Cardiologist', info: 'Heart specialist' },
        { image: image2, name: 'Neurologist', info: 'Skin specialist' },
        { image: image3, name: 'Orthopedic Surgeon', info: 'Bone and joint specialist' },
        { image: image4, name: 'Pediatrician', info: 'Child specialist' },
        { image: image5, name: 'Oncologist', info: 'Cancer specialist' },
        { image: image6, name: 'Gynecologist', info: 'Women’s health specialist' },
        { image: image7, name: 'Endocrinologist', info: 'Hormone and gland specialist' },
        { image: image8, name: 'Psychiatrist', info: 'Social components of mental health' },
        { image: image9, name: 'ENT (Ear, Nose, Throat)', info: 'Ear, nose, and throat treatments.' },
        { image: image10, name: 'Urology', info: 'Kidney, bladder, and urinary tract care.' },
        { image: image11, name: 'Pulmonology', info: 'Lung and respiratory system diseases.' },
        { image: image12, name: 'Rheumatology', info: 'Autoimmune and joint disease' },
        { image: image13, name: 'Hematology', info: 'Blood disorders and treatment' },
        { image: image14, name: 'Plastic Surgery', info: 'Cosmetic and reconstructive surgery' },
        { image: image15, name: 'Radiology', info: 'Medical imaging and diagnostics' },
        { image: image16, name: 'Anesthesiology', info: 'Pain management and anesthesia.' },
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