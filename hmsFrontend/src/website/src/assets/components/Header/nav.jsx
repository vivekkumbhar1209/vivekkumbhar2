import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import logo from './logo2.png'
import 'swiper/css'
import { Link, useNavigate } from 'react-router-dom'
import EnquiryForm from '../enquiry form/enquiry'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loginPopupOpen, setLoginPopupOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  // const [appointmentPopupOpen, setAppointmentPopupOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Emergency Numbers & Book Appointment Button */}
      <div className="bg-white-100 p-4 flex justify-between items-center px-6 relative z-50">
        <div className="text-gray-700 text-sm font-semibold">
          Emergency Number: <span className="text-red-500 text-xs">+123 456 7890</span> | <span className="text-red-500 text-xs">+987 654 3210</span>
        </div>

        <button onClick={() => setAppointmentPopupOpen(true)} className="bg-purple-900 text-white px-3 py-1 rounded-full font-semibold shadow-md hover:opacity-90 text-sm">
          Book Appointment
        </button>
      </div>

      {/* Navbar */}
      <nav className={`p-4 flex items-center justify-between transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50 backdrop-blur-lg bg-white text-black' : 'bg-gradient-to-r from-purple-900 to-pink-600 text-white'}`} style={{ height: '4rem' }}>
        <div className="flex items-center h-full">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />

          <span className="text-lg font-bold">Fortune Multispeciality Hospital</span>
        </div>
        <div className="hidden md:flex justify-center items-center space-x-4 text-md">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About Us
          </Link>
          <Link to="/speciality" className="hover:text-gray-400">
            Specialities
          </Link>
          <Link to="/doctors" className="hover:text-gray-400">
            Doctors
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact Us
          </Link>
          <Link to="/Blog" className="hover:text-gray-400">
            Blog
          </Link>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-white text-blue-600 px-4 py-2 rounded">
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-blue-600 rounded shadow-lg z-50">
                <button onClick={() => setLoginPopupOpen(true)} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
                  Login
                </button>
                <a href="#settings" className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
                  Settings
                </a>
              </div>
            )}
          </div>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu with Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 backdrop-blur-lg bg-transparent bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
          {/* Mobile Menu */}
          <div className="fixed top-[4rem] right-0 w-100 max-h-[80vh] bg-purple-700 text-white p-4 space-y-4 flex flex-col items-center z-50 md:hidden overflow-y-auto">
            <Link to="/" className="block hover:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block hover:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/speciality" className="block hover:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
              Specialities
            </Link>
            <Link to="/doctors" className="block hover:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
              Doctors
            </Link>
            <Link to="/contact" className="block hover:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/blog" className="block hover:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-white text-blue-600 px-4 py-2 rounded">
              Login
            </button>
            {dropdownOpen && (
              <div className="w-full bg-white text-blue-600 rounded shadow-lg text-center relative z-50">
                <button onClick={() => setLoginPopupOpen(true)} className="block px-4 py-2 hover:bg-gray-200 w-full">
                  Login
                </button>
                <a href="#settings" className="block px-4 py-2 hover:bg-gray-200 w-full">
                  Settings
                </a>
              </div>
            )}
          </div>
        </>
      )}

      {/* Login Popup */}
      {loginPopupOpen && (
        <div className="fixed inset-0 backdrop-blur-lg bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm relative">
            <button onClick={() => setLoginPopupOpen(false)} className="absolute top-2 right-2 text-red-600 hover:text-gray-900">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <input type="text" placeholder="Username" className="w-full p-2 border rounded mb-2" />
            <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
          </div>
        </div>
      )}

      {/* Appointment Popup */}
      {appointmentPopupOpen && (
        <div className="fixed inset-0 backdrop-blur-lg bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative max-h-screen overflow-y-auto">
            <button onClick={() => setAppointmentPopupOpen(false)} className="absolute top-3 right-4 text-red-600 hover:text-gray-900">
              <X size={20} />
            </button>
            <h2 className="text-xl bg-white-100 font-bold mb-4 text-center">Book an Appointment</h2>
            <label className="block mb-1">Name</label>
            <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Gender</label>
            <select className="w-full p-2 border rounded mb-2">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <label className="block mb-1">Email Address</label>
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Phone Number</label>
            <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Date of Birth</label>
            <input type="date" placeholder="Date of Birth" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Address</label>
            <input type="text" placeholder="Address" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Date of Appointment</label>
            <input type="date" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Time</label>
            <input type="time" className="w-full p-2 border rounded mb-2" />
            <label className="block mb-1">Select a Doctor</label>
            <select className="w-full p-2 border rounded mb-2">
              <option>Select Doctor</option>
              <option>Dr. Smith</option>
              <option>Dr. Johnson</option>
            </select>
            <div className="mb-4">
              <label className="block text-gray-700">Have you ever applied to our facility before?</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" name="appliedBefore" value="yes" className="mr-2" /> Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" name="appliedBefore" value="no" className="mr-2" /> No
                </label>
              </div>
            </div>
            <label className="block mb-1">Message</label>
            <textarea placeholder="Message" className="w-full p-2 border rounded mb-4"></textarea>
            <button className="bg-purple-600 text-white px-4 py-2 rounded w-full">Confirm</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
