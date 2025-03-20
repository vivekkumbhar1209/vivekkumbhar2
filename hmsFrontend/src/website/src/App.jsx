import './App.css'
import Navbar from './assets/components/Header/nav';
import HospitalInfo from './Home'
import ServicesCarousel from './services'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ServicesCarousel from './services';
// import DoctorsSection from '/./assets/components/DoctorsSection';
import Homepage from './assets/pages/Homepage';
import Speciality from './assets/components/Spacialty/Spaciality';
import Seemore from './assets/components/Spacialty/Seemore';
import AllDoctors from './assets/components/doctorsection/AllDoctors';
import NavFooter from './assets/components/layouts/NavFooter';
import Blog from './assets/components/Blog';
import AboutUs from './assets/pages/About';
import EnquiryForm from './assets/components/enquiry form/enquiry';

// import Homepage from './assets/pages/Homepage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Homepage />
          </>
        } />
        <Route path="/seemore" element={<Seemore />} />
        <Route path="/doctors" element={<NavFooter propelement={<AllDoctors />} />} />
        <Route path="/blog" element={<NavFooter propelement={<Blog />} />} />
        <Route path="/speciality" element={<NavFooter propelement={<Speciality />} />} />
        <Route path="/about" element={<NavFooter propelement={<AboutUs />} />} />
        <Route path="/contact" element={<NavFooter propelement={<EnquiryForm />} />} />
        <Route path="/enquiry" element={<EnquiryForm />} />

      </Routes>
    </Router>
  );
}

export default App;



