import React from "react";
import homepageImage from '../Images/Homepage.jpg'

const HospitalInfo = () => {
  return (
    <>
      <section className="relative w-full h-[80vh] max-h-screen mt-1">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={homepageImage} // Replace with your actual image path
            alt="Medical Care"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 md:px-24 text-white">
          <h1 className="text-5xl md:text-6xl font-light">
            We Provide <br />
            <span className="font-bold">Full Medical Care</span>
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl">
            Helping thousands of people to get high-class medical services. Your health is your most important asset.
          </p>
          <button className="mt-6 px-6 py-3 bg-purple-900  hover:opacity-90 text-lg font-medium rounded-md shadow-lg">
            Read More →
          </button>
        </div>
      </section>
    </>
  );
};
export default HospitalInfo;



// demo comment