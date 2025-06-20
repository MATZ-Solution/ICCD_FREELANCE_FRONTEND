import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/ICCD-01.png'
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../../src/css/navbar.css'

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
    { name: "Login", href: "#" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="bg-white shadow fontFamily-montreal">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4 ">
        <div className="flex justify-between items-center ">

          {/* logo */}
          <div className=" w-32 object-contain">
            <img className="" src={logo} />
          </div>

          {/* Mobile Menu Button */}
          <div className="show_nav_links_mobile ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black  focus:outline-none"
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

          {/* Desktop Navigation */}
          <nav className="show_nav_links_desktop space-x-6 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black font-semibold  hover:text-[#15A9B2] transition"
              >
                {item.name !== 'Login' && item.name}
                {(item.name !== 'Contact Us' && item.name !== 'Login') && (<KeyboardArrowDownIcon />)}
              </a>
            ))}
          </nav>

          {userDetails && (<p className="text-red-300">Become a seller</p>)}
          {userDetails && (<Link to="/freelancer-profile" className="text-white">Profile</Link>)}

          {/* Desktop Navigation Right Section*/}
          <div className="show_nav_links_desktop">
            {
              (userDetails === null) &&
              <button onClick={() => navigate('/login')} className="ml-4 px-4 py-2  text-black font-semibold rounded  cursor-pointer hover:text-[#15A9B2]">
                Login
              </button>
            }

            <button onClick={() => navigate('/login')} className="shadow-xl/20 flex items-center justigy-center gap-5 ml-4 px-4 py-2 bg-[#15A9B2] text-white rounded-full hover:bg-[#05929c] transition cursor-pointer font-semibold hidden md:flex">
              <p>Get Started Now</p>
              <div className=' rounded-full px-2 py-1 bg-[#60cfd6]'>
                <EastIcon style={{ fontSize: 20 }} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`show_nav_links_mobile h-[80vh] px-4 pb-4 space-y-2 flex flex-col`}>
          {navigation.map((item) => (
            <div className="flex items-center h-full justify-between">
              <button
                key={item.name}
                href={item.href}
                className="block text-black  hover:text-blue-600 transition"
              >
                {item.name}
              </button>
              {item.name !== 'Contact Us' && (<KeyboardArrowDownIcon />)}
            </div>
          ))}
          <button className="w-full mt-2 px-4 py-2 bg-[#15A9B2] text-white rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      )}

    </header>
  );
}
