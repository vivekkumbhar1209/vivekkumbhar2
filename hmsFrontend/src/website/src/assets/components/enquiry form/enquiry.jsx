import { FaPhone, FaInstagram, FaXTwitter, FaLinkedinIn, FaFacebookF, FaYoutube, FaLocationDot } from "react-icons/fa6";
import enquirybg from "../../../../Images/enquirybg.jpg";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Ringloader from '../../../../../components/RingLoader'
import api from '../../../../../api'

const EnquiryForm = () => {

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    message: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await api.post('/submit-enquiry', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your enquiry has been submitted successfully.',
        confirmButtonColor: '#6C5CE7', // Purple button color
      });
      setFormData({ name: '', email: '', mobile_no: '', address: '', message: '' });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
        text: 'Failed to submit enquiry. Please try again.',
        confirmButtonColor: '#d33', // Red button color
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row gap-6 p-6 justify-center mb-14 mt-14 "
      style={{
        backgroundImage: `url(${enquirybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Enquiry Form */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full md:w-1/2 bg-opacity-90 mx-auto md:mx-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-800 mb-1">Name*</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your Name" className="w-full border-b border-gray-400 p-2 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block font-medium text-gray-800 mb-1">E-mail*</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your E-mail" className="w-full border-b border-gray-400 p-2 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block font-medium text-gray-800 mb-1">Mobile No.*</label>
              <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleChange} placeholder="Enter your mobile number" className="w-full border-b border-gray-400 p-2 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block font-medium text-gray-800 mb-1">Address*</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className="w-full border-b border-gray-400 p-2 focus:outline-none focus:border-black" />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-800 mb-1">Your Message(Reason)*</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message here" className="w-full border-b border-gray-400 p-2 focus:outline-none focus:border-black" rows="2"></textarea>
          </div>
          <button type="submit" className="block mt-6 bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition mb-0">
            {loading ? (
              <Ringloader />
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>

      {/* Contact Us */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full md:w-1/3 bg-opacity-90 mx-auto md:mx-0">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <div className="space-y-6">
          {/* Phone Section */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaPhone className="text-red-500 text-xl" />
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-gray-700">+91 88888 22222</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <p className="font-medium">Follow us on</p>
            <div className="flex space-x-4 mt-3">
              <FaInstagram className="text-black text-2xl cursor-pointer" />
              <FaXTwitter className="text-black text-2xl cursor-pointer" />
              <FaLinkedinIn className="text-black text-2xl cursor-pointer" />
              <FaFacebookF className="text-black text-2xl cursor-pointer" />
              <FaYoutube className="text-black text-2xl cursor-pointer" />
            </div>
          </div>

          {/* Address Section */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaLocationDot className="text-red-500 text-2xl" />
            </div>
            <div>
              <p className="font-medium">Address</p>
              <p className="text-gray-700">Back to Kunal Hotel, Nnk Road, Rahatani, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
