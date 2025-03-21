import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import starImage from '../Images/five-stars.png'

function Feedback() {
  useEffect(() => {
    AOS.init();
  }, []);

  // Patient experience videos
  const videos = [
    "https://videocdn.cdnpk.net/videos/5b96e35d-520f-51bb-9ae6-fe0adc171ce5/horizontal/previews/videvo_watermarked/large.mp4",
    "https://videocdn.cdnpk.net/videos/7308a558-d3e7-5b5d-ab92-4eeffeb4a3ee/horizontal/previews/videvo_watermarked/large.mp4",
    "https://videocdn.cdnpk.net/videos/5b96e35d-520f-51bb-9ae6-fe0adc171ce5/horizontal/previews/videvo_watermarked/large.mp4",
    "https://videocdn.cdnpk.net/videos/7308a558-d3e7-5b5d-ab92-4eeffeb4a3ee/horizontal/previews/videvo_watermarked/large.mp4",
  ];

  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      const currentVideo = videoRefs.current[activeIndex];
      currentVideo.play();
      currentVideo.onended = () => {
        const nextIndex = (activeIndex + 1) % videos.length;
        setActiveIndex(nextIndex);
        if (swiperRef.current) {
          swiperRef.current.slideTo(nextIndex);
        }
      };
    }
  }, [activeIndex]);

  // Patient testimonials
  const testimonials = [
    {
      text: "I recently had an incredible experience at JK Hospital, and their doctors are exceptional!",
      name: "T. Gowtham",
      role: "Patient",
      image: starImage,
    },
    {
      text: "Dr. Subramani's dedication to healthcare is truly praiseworthy.",
      name: "T. Vasudevan",
      role: "Patient",
      image: starImage,
    },
    {
      text: "Dr. Kishore provided me with an excellent treatment plan.",
      name: "T. Meena",
      role: "Patient",
      image: starImage,
    },
  ];

  return (
    <div className="main-container">
      {/* Video Swiper Section */}
      <div className="video-container">
        <h2 className="section-title" style={{ fontSize: "30px" }} data-aos="fade-up" data-aos-duration="1000">
          <strong>Patient Experience Stories</strong>
        </h2>

        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="swiper-video"
          data-aos="fade-up"
          data-aos-duration="2000"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                width="100%"
                height="auto"
                playsInline
                muted
                loop={false}
                autoPlay={index === 0} // Auto-play the first video
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Patient Testimonials Swiper */}
      <div className="testimonials-container h-100 flex justify-center align-center flex-col" style={{ textAlign: "center" }}>
        <h2 className="section-title" style={{ fontSize: "30px" }} data-aos="fade-up" data-aos-duration="1000">
          <strong>Patient Speaks</strong>
        </h2>
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="swiper-testimonials"
          data-aos="fade-up"
          data-aos-duration="2000"
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-box">
                <h3>{testimonial.name}</h3>
                <p>{testimonial.text}</p>
                <div className="rating-stars">
                  <img src={testimonial.image} alt="Star Rating" className="testimonial-img" />
                </div>
                <p>{testimonial.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Feedback;