import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/ICCD-01.png'
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../../src/css/navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Bell, Mail, HelpCircle, Star, TrendingUp, FileText, Users, Filter, X, Menu } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { navigation, navTabsFreelancerDashboard, navTabsClientDashboard } from "../../constants/navbar_navigation";
import { useCheckIsFreelancer } from "../../api/client/user";
import NotificationDropdown from "./NotificationDropdown";
import NotificationBell from "./notificationBell";
import { useGetNotification } from "../../api/client/notification";
import { setUserType } from "../../redux/slices/userType";
import { useDispatch } from "react-redux";

export default function Navbar() {

  const { data, error, isSuccess, isPending, isError } = useCheckIsFreelancer()
  // const { data: notData } = useGetNotification({ type: 'freelancer' })
  // console.log("############    notData   #############: ", notData)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const userDetails = useSelector(state => state.user.userDetails)
  const { pathname } = location
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isShowNot, setIsShowNot] = useState(false)
  const client = useSelector((state) => state.user.userDetails);
  const freelancer = useSelector((state) => state.userProfile.userProfile);

  const logout = useLogout()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSwitchClient = () => {
    if (location.pathname === '/freelancer/dashboard') {
      navigate('/client')
      dispatch(setUserType({ id: client?.id, type: 'client' }))

    } else {
      navigate('/freelancer/dashboard')
    }
    setShowProfileMenu(false)
  }

  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      if (search) {
        params.set("query", search);
      } else {
        params.delete("query");
      }
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [search, location.pathname, navigate]);


  return (
    <header className="bg-white shadow fontFamily-montreal border-b-[1px] border-b-[#c4c4c4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        <div className="flex justify-between items-center ">
          {/* logo */}
          <div onClick={() => navigate('/')} className="w-20 h-20 md:w-24 md:h-24">
            <img className="w-full h-full object-contain" src={logo} />
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

          {/* Desktop middle Section */}
          {/* {false ?
            <div className="relative ">
              <input placeholder="What services are you looking for today " className="rounded w-xl h-10 p-3 border-[1px] border-gray-400"></input>
              <div className="rounded absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black">
                <SearchIcon className="text-white" />
              </div>
            </div>
            :
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
          } */}

          {/* Nav links middle section */}
          {
            (pathname.includes('/freelancer')) ?
              <nav className=" ml-10 sm:flex space-x-1">
                {navTabsFreelancerDashboard.map((data, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`${data.path}`)}
                    className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-md ${pathname === data.path
                      ? "text-cyan-500 bg-cyan-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    {data.name}
                  </button>
                ))}
              </nav>
              :
              pathname.includes('/client/') ?
                <nav className=" ml-10 sm:flex space-x-1">
                  {navTabsClientDashboard.map((data, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(`${data.path}`)}
                      className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-md ${pathname === data.path
                        ? "text-cyan-500 bg-cyan-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      {data.name}
                    </button>
                  ))}
                </nav>
                :
                pathname === ('/client') ?
                  <nav className=" ml-10 sm:flex space-x-1">
                    <div className="relative ">
                      <input onChange={(e) => setSearch(e.target.value)} placeholder="What services are you looking for today " className="rounded w-xl h-10 p-3 border-[1px] border-gray-400"></input>
                      <div className="rounded absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black">
                        <SearchIcon className="text-white" />
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          if (data.length === 0) {
                            navigate(`/freelancer/profile-form/1`)
                          } else {
                            navigate(`/freelancer/dashboard`)
                            dispatch(setUserType({ id: freelancer?.id, type: 'freelancer' }))
                          }
                        }}
                        className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-md `}
                      >
                        Switch to freelancer
                      </button>
                      <button
                        onClick={() => navigate(`/client/order`)}
                        className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-md `}
                      >
                        Orders
                      </button>
                    </div>

                  </nav>
                  :
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
          }

          {/* {userDetails && (<p className="text-red-300">Become a seller</p>)}
          {userDetails && (<Link to="/freelancer-profile" className="text-white">Profile</Link>)} */}

          {/* Desktop Right Section*/}

          {
            userDetails ?
              <div className="flex items-center gap-2">
                <header className=" z-10 relative">
                  <NotificationBell isShowNot={isShowNot} setIsShowNot={setIsShowNot} />
                  {isShowNot && (<NotificationDropdown />)}
                </header>
                <button onClick={() => setMessages(0)} className="p-2 hover:bg-gray-100 rounded-md relative">
                  <Mail className="h-5 w-5 text-gray-600" />
                  {messages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {messages}
                    </span>
                  )}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="cursor-pointer w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"
                  />
                  {showProfileMenu && (
                    <>
                      {/* profile menu */}
                      {pathname.includes('freelancer') && (
                        <div className="px-3 border-[1px] border-gray-300 absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg  py-1 z-50">
                          <button className="cursor-pointer border-[1px] rounded-md border-black block w-full text-left px-4 py-2 text-sm text-black font-semibold hover:bg-[#222325] hover:text-white"
                            onClick={handleSwitchClient}
                          >Switch to clients</button>
                          {[
                            { name: "View Profile", action: () => navigate("/freelancer/edit-profile") },
                            { name: "Settings", action: () => navigate("/settings") },
                            { name: "Logout", action: logout },
                          ].map((data, index) => (
                            <button key={index} className="text-black block w-full text-left px-4 py-2 text-sm  hover:bg-gray-50 cursor-pointer"
                              onClick={data.action}
                            >
                              {data.name}
                            </button>
                          ))}

                        </div>
                      )
                      }
                      {pathname.includes('client') && (
                        <div className="px-3 border-[1px] border-gray-300 absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg  py-1 z-50">
                          {[
                            { name: "Dashboard", action: () => navigate("/client/dashboard") },
                            { name: "View Profile", action: () => navigate("/client/profile") },
                            { name: "Logout", action: logout },
                          ].map((data, index) => (
                            <button key={index} className="text-black block w-full text-left px-4 py-2 text-sm  hover:bg-gray-50 cursor-pointer"
                              onClick={data.action}
                            >
                              {data.name}
                            </button>
                          ))}
                        </div>
                      )
                      }
                    </>
                  )}
                </div>
              </div>
              :
              <div className="show_nav_links_desktop">
                {
                  (userDetails === null) &&
                  (
                    <>
                      <button onClick={() => navigate('/login')} className="ml-4 px-4 py-2  text-black font-semibold rounded  cursor-pointer hover:text-[#15A9B2]">
                        Login
                      </button>
                      <button onClick={() => navigate('/login')} className="shadow-xl flex items-center justigy-center gap-5 ml-4 px-4 py-2 bg-[#15A9B2] text-white rounded-full hover:bg-[#05929c] transition cursor-pointer font-semibold hidden md:flex">
                        <p>Get Started Now</p>
                        <div className=' rounded-full px-2 py-1 bg-[#60cfd6]'>
                          <EastIcon style={{ fontSize: 20 }} />
                        </div>
                      </button>
                    </>
                  )
                }
              </div>
          }
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