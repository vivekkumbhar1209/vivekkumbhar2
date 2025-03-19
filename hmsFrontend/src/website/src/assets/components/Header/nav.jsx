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
  const navigate = useNavigate();

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
        <div className="text-gray-700 font-semibold">
          Emergency Number: <span className="text-red-500">+123 456 7890</span> |{' '}
          <span className="text-red-500">+987 654 3210</span>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="bg-purple-900 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:opacity-90"
        >
          Book Appointment
        </button>
      </div>

      {/* Navbar */}
      <nav
        className={`p-4 flex items-center justify-between transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50 backdrop-blur-lg bg-white text-black' : 'bg-gradient-to-r from-purple-900 to-pink-600 text-white'}`}
        style={{ height: '4rem' }}
      >
        <div className="flex items-center h-full">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold">Fortune Multispeciality Hospital</span>
        </div>
        <div className="hidden md:flex justify-center items-center space-x-6 text-lg">
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
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-blue-600 rounded shadow-lg z-50">
                <button
                  onClick={() => setLoginPopupOpen(true)}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
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
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-700 text-white p-4 space-y-4 flex flex-col items-center">
          <Link to="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-200">
            About Us
          </Link>
          <Link to="/speciality" className="block hover:text-gray-200">
            Specialities
          </Link>
          <Link to="/doctors" className="block hover:text-gray-200">
            Doctors
          </Link>
          <Link to="/contact" className="block hover:text-gray-200">
            Contact Us
          </Link>
          <Link to="/blog" className="block hover:text-gray-200">
            Blog
          </Link>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            Login
          </button>
          {dropdownOpen && (
            <div className="w-full bg-white text-blue-600 rounded shadow-lg text-center relative z-50">
              <button
                onClick={() => setLoginPopupOpen(true)}
                className="block px-4 py-2 hover:bg-gray-200 w-full"
              >
                Login
              </button>
              <a href="#settings" className="block px-4 py-2 hover:bg-gray-200 w-full">
                Settings
              </a>
            </div>
          )}
        </div>
      )}
      {loginPopupOpen && (
        <div className="fixed inset-0 backdrop-blur-lg bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm relative">
            <button
              onClick={() => setLoginPopupOpen(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <input type="text" placeholder="Username" className="w-full p-2 border rounded mb-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
          </div>
        </div>
      )}
      {/* {appointmentPopupOpen && (
         <div className="fixed inset-0 backdrop-blur-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
           <button
             onClick={() => setAppointmentPopupOpen(false)}
             className="absolute top-3 right-4 text-red-600 hover:text-gray-900"
           >
             <X size={20} />
           </button>
           <EnquiryForm />
         </div>
       </div>
      )} */}
    </>
  )
}

export default Navbar
