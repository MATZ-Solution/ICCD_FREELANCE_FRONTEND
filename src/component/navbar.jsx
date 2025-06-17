import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/ICCD-01.png'
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Navbar() {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const userDetails = useSelector(state => state.user.userDetails)
  console.log("user details: ", userDetails)


  const navigation = [
    { name: "Find Talent", href: "#" },
    { name: "Find Work", href: "#" },
    { name: "Why ICCD Freelance", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <header className="bg-white shadow ">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4 ">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <div className="w-32 object-contain">
            <img className="" src={logo} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black font-semibold  hover:text-blue-600 transition"
              >
                {item.name}
                {item.name !== 'Contact Us' && (<KeyboardArrowDownIcon />)}
              </a>
            ))}
          </nav>
          {/* <p className="text-red-300">Become a seller</p> */}
          {userDetails && (<p className="text-red-300">Become a seller</p>)}

          {userDetails && (<Link to="/freelancer-profile" className="text-white">Profile</Link>)}

          <div className="flex">
            {
              (userDetails === null) &&
              <button onClick={() => navigate('/login')} className="ml-4 px-4 py-2  text-black font-semibold rounded  cursor-pointer">
                Login
              </button>
            }

            <button onClick={() => navigate('/login')} className="flex items-center justigy-center gap-5 ml-4 px-4 py-3 bg-[#15A9B2] text-white rounded-full hover:bg-blue-700 transition cursor-pointer font-semibold hidden md:flex">
              <p>Get Started Now</p>
              <EastIcon />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                // Close Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-black  hover:text-blue-600 transition"
            >
              {item.name}
              {item.name !== 'Contact Us' && (<KeyboardArrowDownIcon />)}

            </a>
          ))}
          <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
