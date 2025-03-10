import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Doctors from "./AllDoctors";
import doctorsdata from "./doctorsdata";
import { Link } from "react-router-dom";

function DoctorsSection() {
  return (
    <>
      <section className="overflow-scroll p-2 pb-10 h-full no-scrollbar gradient-doctor">
        <h1 className="text-center text-gray-600 m-2 font-bold text-3xl">
          Meet Our Doctors
        </h1>
        <div className="relative">
          {/* Custom navigation buttons */}
          {/* Custom navigation buttons */}
          <button className="custom-prev-doc absolute left-2 sm:left-0 md:-left-6 lg:left-15 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition">
            ❮
          </button>
          <button className="custom-next-doc absolute right-2 sm:right-0 md:-right-6 lg:right-15 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition">
            ❯
          </button>

          <Swiper
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: true,
            // }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              200: {
                slidesPerView: 1,
                // spaceBetween: 10,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1000: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            loop={true}
            navigation={{
              prevEl: ".custom-prev-doc",
              nextEl: ".custom-next-doc",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper sm:max-w-250"
          >
            {doctorsdata.map((doctor, index) => {
              if (index < 5) {
                return (
                  <SwiperSlide className="" key={doctor.name}>
                    <div className="group" key={doctor.name}>
                      <div className="p-2 flex flex-col justify-center rounded-lg">
                        <div className="flex h-75 sm:h-70 align-self-center justify-center    ">
                          <img
                            src={doctor.photo}
                            alt="docphoto"
                            className="sm:rounded-md w-80 h-90 mb-2 sm:w-75 sm:h-80 object-cover transition-transform duration-400 ease-in-out group-hover:scale-110 shadow-md shadow-white-100 overflow-hidden"
                          />
                        </div>
                        <div className=" w-75 m-auto p-2 text-center sm:w-60 sm:80 sm:pt-1 bg-opacity-50 backdrop-blur-2xl  shadow-md   ">
                          <div className=" mb-1 ml-1  font-bold">
                            {doctor.name}
                          </div>
                          <div className=" mb-1 ml-1   italic">
                            {doctor.specialty}
                          </div>
                          <a href="#">view more</a>
                          {/* <div className="  ml-1   w-auto h-20 sm:h-50">
                        {doctor.description}
                      </div> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>
        <div className="flex justify-center m-2">

        <Link
          className="bg-purple-900 pl-2 text-white text-lg pr-2 pt-1 pb-1 rounded-md ml-50% hover:bg-purple-500 hover:outline-2 border-1 border-white hover:outline-[var(--accent-2)] transition-all duration-200 ease "
          to={"/doctors"}
          >
          View All
        </Link>
          </div>
      </section>
    </>
  );
}

export default DoctorsSection;
