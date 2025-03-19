import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";
import HospitalInfo from "../../Home"
import Blog from "../components/Blog"
import EnquiryForm from "../components/enquiry form/enquiry"
import MapSection from "../components/map"
import Footer from "../components/footer/Footer"
const DoctorsSection = React.lazy(() => import("../components/doctorsection/DoctorsSection"))
const ServicesCarousel = React.lazy(() => import("../../services"))
const Speciality = React.lazy(() => import("../components/Spacialty/Spaciality"))
const Feedback = React.lazy(() => import('../../Feedback'))


const Homepage = () => {
  return (
    <>
      <HospitalInfo />
      <Suspense fallback={
        <div className='flex justify-center items-center h-screen w-screen'>
          <Loader />
        </div>}>
        <ServicesCarousel />
        <Speciality />
        <DoctorsSection />
        <EnquiryForm />
        <Feedback />
      </Suspense>
      <MapSection />
      <Blog />
      <Footer />
    </>
  )
}

export default Homepage;