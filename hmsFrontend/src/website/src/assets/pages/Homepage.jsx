import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";
const Footer = React.lazy(() => import("../components/footer/Footer"))
const DoctorsSection = React.lazy(() => import("../components/doctorsection/DoctorsSection"))
const HospitalInfo = React.lazy(() => import("../../Home"))
const ServicesCarousel = React.lazy(() => import("../../services"))
const Speciality = React.lazy(() => import("../components/Spacialty/Spaciality"))
const EnquiryForm = React.lazy(() => import("../components/enquiry form/enquiry"))
const Blog = React.lazy(() => import("../components/Blog"))
const MapSection = React.lazy(() => import("../components/map"))

const Feedback = React.lazy(() => import('../../Feedback'))

const Homepage = () => {
  return (
    <>
      <Suspense fallback={
        <div className='flex justify-center items-center h-screen w-screen'>
          <Loader />
        </div>

      }>
        <HospitalInfo />
        <ServicesCarousel />
        <Speciality />
        <DoctorsSection />
        <Feedback />
        <Blog />
        <EnquiryForm />
        <MapSection />
        <Footer />
      </Suspense>
    </>
  )
}

export default Homepage;