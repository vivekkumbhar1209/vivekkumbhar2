import React from "react";
import Feedback from "../../Feedback";
import Footer from "../components/footer/Footer";
import DoctorsSection from "../components/doctorsection/DoctorsSection";
import HospitalInfo from "../../Home";
import ServicesCarousel from "../../services";
import Speciality from "../components/Spacialty/Spaciality";
import EnquiryForm from "../components/enquiry form/enquiry";
import Blog from "../components/Blog";
import MapSection from "../components/map";
const Homepage = () => {
  return (
    <>
      <HospitalInfo />
      <ServicesCarousel />
      <Speciality />
      <DoctorsSection />
      <Feedback />
      <Blog />
      <EnquiryForm />
      <MapSection />
      <Footer />
    </>
  )
}

export default Homepage;