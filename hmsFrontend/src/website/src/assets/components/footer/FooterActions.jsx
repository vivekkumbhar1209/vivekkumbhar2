import React from "react";
import { useNavigate } from "react-router-dom";

const FooterAction = () => {

    const navigate = useNavigate()
    return (
        <div className="flex h-fit">
            <a onClick={() => navigate('/contact')} className="bg-white text-[#f5468c] font-bold pl-3 pr-3 pt-3 pb-3 rounded-md text-nowrap">Book Appointment</a>
            {/* <a href="#" className="" type="button">Special Assessment</a> */}
        </div>


    )
}

export default FooterAction;
