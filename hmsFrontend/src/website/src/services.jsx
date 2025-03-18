import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import outpatientImage from '../Images/outpatient.jpg'
import emergency from '../Images/emergency.jpg'
import surgery from '../Images/surgery.jpg'
import pathologyServices from '../Images/Pathology-Services.jpg'
import pharmacy from '../Images/pharmacy.jpg'
import ambulance from '../Images/ambulance.jpg'
import radiology from '../Images/radiology.jpg'
import homehealthcare from '../Images/homehealthcare.jpg'


const services = [
  { title: "Outpatient Consultation", image: outpatientImage },
  { title: "24/7 Emergency Care", image: emergency },
  { title: "Surgeries", image: surgery },
  { title: "Pathology Lab", image: pathologyServices },
  { title: "24/7 Pharmacy", image: pharmacy },
  { title: "Ambulance Services", image: ambulance },
  { title: "Radiology", image: radiology },
  { title: "Home Healthcare", image: homehealthcare },
];

const ServicesCarousel = () => {
  return (
    <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-center mb-4 mt-5">Our Services</h2>
      <p className="text-center text-gray-600 mb-8">
        Providing high-quality healthcare services to ensure your well-being.
      </p>

      <div className="relative">
        {/* Custom navigation buttons */}
        <button style={{borderRadius:'20px'}} className="custom-prev absolute left-2 sm:left-0 md:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition">
          ❮
        </button>
        <button style={{borderRadius:'20px'}} className="custom-next absolute right-2 sm:right-0 md:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition">
          ❯
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },  // Mobile
            480: { slidesPerView: 2 },  // Small screens
            768: { slidesPerView: 3 },  // Tablets
            1024: { slidesPerView: 4 }, // Laptops
            1280: { slidesPerView: 5 }, // Desktops
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-64 m-3">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center flex flex-col justify-center h-24">
                  <h3 style={{fontSize:'17px'}} className="text-9xl font-semibold text-gray-800">{service.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default ServicesCarousel;




