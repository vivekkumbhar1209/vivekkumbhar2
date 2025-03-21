import { useRef, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]); 
  const dialogRef = useRef([]); 

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/doctors/info") 
      .then((response) => {
        setDoctors(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  
  const handleClick = (index) => {
    dialogRef.current[index].showModal(); 
  };

  return (
    <>
      <section className="overflow-scroll p-2 pb-10 h-full no-scrollbar gradient-doctor">
        <h1 className="text-center text-gray-600 m-2 font-bold text-3xl mb-4">
          Meet Our Doctors
        </h1>
        <div className="grid grid-cols-1 grid-rows-1 gap-1 md:grid-cols-3 lg:gap-2 ml-20 mr-20">
          {doctors.map((doctor, index) => (
            <div className="group" key={doctor.id}>
              <div className="p-2 flex flex-col justify-center rounded-lg">
                <div className="flex h-50 sm:h-100 align-self-center justify-center">
                  <img
                    src={`http://127.0.0.1:8000/storage/${doctor.profilePhoto}`}
                    alt="Doctor"
                    className="sm:rounded-md w-full h-50 lg:h-100 lg:w-80 mb-2 object-cover transition-transform duration-400 ease-in-out group-hover:scale-110 shadow-md shadow-white-100 overflow-hidden"
                  />
                </div>
                <div className="w-75 m-auto p-2 text-center sm:w-60 sm:80 sm:pt-1 bg-opacity-50 backdrop-blur-2xl shadow-md">
                  <div className="mb-1 ml-1 font-bold">{doctor.name}</div>
                  <div className="mb-1 ml-1 italic">{doctor.department_name}</div>
                  <div className="mb-1 ml-1 italic">{doctor.experience} Years</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllDoctors;
