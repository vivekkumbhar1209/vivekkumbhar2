import { useRef } from "react";
import React from "react";
import doctorsdata from "./doctorsdata";

const AllDoctors = () => {
  const dialogRef = useRef([]); // Store references for each modal

  // Handle opening the modal
  const handleclick = (index) => {
    dialogRef.current[index].showModal(); // Open the specific modal based on index
  };

  return (
    <>
      <section className="overflow-scroll p-2 pb-10 h-full no-scrollbar gradient-doctor">
        <h1 className="text-center text-gray-600 m-2 font-bold text-3xl mb-4">
          Meet Our Doctors
        </h1>
        <div className="grid grid-cols-1 grid-rows-1 gap-1 md:grid-cols-3 lg:gap-2 ml-20 mr-20">
          {doctorsdata.map((doctor, index) => {
            return (
              <div className="group" key={doctor.name}>
                <div className="p-2 flex flex-col justify-center rounded-lg">
                  <div className="flex h-50 sm:h-100 align-self-center justify-center">
                    <img
                      src={doctor.photo}
                      alt="docphoto"
                      className="sm:rounded-md w-full h-50 lg:h-100 lg:w-80 mb-2 object-cover transition-transform duration-400 ease-in-out group-hover:scale-110 shadow-md shadow-white-100 overflow-hidden"
                    />
                  </div>
                  <div className="w-75 m-auto p-2 text-center sm:w-60 sm:80 sm:pt-1 bg-opacity-50 backdrop-blur-2xl shadow-md">
                    <div className="mb-1 ml-1 font-bold">{doctor.name}</div>
                    <div className="mb-1 ml-1 italic">{doctor.specialty}</div>
                    {/* Wrap the handleclick call inside an anonymous function */}
                    <button onClick={() => handleclick(index)}>
                      View More
                    </button>

                    {/* Dialog modal for each doctor */}
                    <dialog
                      ref={(el) => (dialogRef.current[index] = el)}
                      className="w-auto max-w-2xl h-auto p-10 rounded-lg bg-white backdrop-blur-md shadow-xl 
    fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        onClick={() => dialogRef.current[index].close()}
                        className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
                      >
                        X
                      </button>

                      <div className="text-center">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
                          {doctor.name}
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-600">
                          {doctor.description}
                        </p>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AllDoctors;
