import React from "react";
import Navbar from "../Header/nav";
import Footer from "../footer/Footer";

const NavFooter = ({propelement}) => {

    return (
        <>
        <Navbar/>
        {propelement}
        <Footer/>
        </>
        
    )
}

export default NavFooter;