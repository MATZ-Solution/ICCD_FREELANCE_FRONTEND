import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerVideo from '../assets/homevideo.mp4';
import { Palette, Megaphone, PenTool, Video, Code } from "lucide-react";

const Banner1 = () => {
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState('find-talent');
  const [search, setSearch] = useState('');
  
    const [activeCategory, setActiveCategory] = useState('find-talent');


  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/find-talent?search=${encodeURIComponent(search)}`);
    }
  };

  const categories = [
    {
      title: "Graphics & Design",
      value: "Graphics and Design",
      subtitle: "Creative visual content",
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      bg: "bg-pink-100"
    },
    {
      title: "Digital Marketing",
      value: "Digital Marketing",
      subtitle: "Grow your audience",
      icon: <Megaphone className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100"
    },
    {
      title: "Writing and Translation",
      value: "Writing and Translation",
      subtitle: "Words that connect",
      icon: <PenTool className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-100"
    },
    {
      title: "Video & Animation",
      value: "Video and Animation",
      subtitle: "Bring stories to life",
      icon: <Video className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100"
    },
    {
      title: "Programming & Tech",
      value: "Programming and Tech",
      subtitle: "Code and innovation",
      icon: <Code className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="relative flex flex-col md:flex-row items-center justify-between w-full  md:h-[70vh] lg:h-[65vh] p-4 sm:p-6 md:p-12 rounded-3xl shadow-lg overflow-hidden">
        
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl" />

        {/* Content */}
        <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug md:leading-tight mb-6">
            Your Gateway to Opportunity, Growth, and Collaboration
          </h1>

          <div className="bg-black/30 rounded-xl p-4 sm:p-5 md:p-6 max-w-full md:max-w-[90%] lg:max-w-[70%] mx-auto md:mx-0">
            {/* Tabs */}
            <div className="flex overflow-hidden rounded-full mb-4 bg-black/50 p-1 sm:p-2">
              <button
                onClick={() => setBtnState('find-talent')}
                className={` ${btnState === 'find-talent' ? ' text-white' : 'text-white'} flex-1 h-10 rounded-full text-sm sm:text-base transition duration-300 cursor-pointer`}
              >
Search & Discover Talent              </button>
        
            </div>

            {/* Search Bar */}
            {btnState === 'find-talent' && (
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by role, skills, or keywords"
                  className="w-full h-12 sm:h-14 rounded-full px-4 sm:px-5 bg-black/40 placeholder-gray-400 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
                />

                {/* Desktop Search Button */}
                <button
                  onClick={handleSearch}
                  className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 sm:px-5 rounded-full bg-teal-500 hover:bg-teal-600 text-white items-center gap-2 transition duration-300"
                >
                  <SearchIcon style={{ width: 25, height: 25 }} />
                  <span className="text-sm sm:text-base">Search</span>
                </button>

                {/* Mobile Search Button */}
                <div className="mt-3 flex sm:hidden">
                  <button
                    onClick={handleSearch}
                    className="w-full flex items-center justify-center gap-2 h-11 bg-teal-500 rounded-full text-white hover:bg-teal-600 transition duration-300"
                  >
                    <SearchIcon style={{ width: 25, height: 25 }} />
                    <span className="text-base">Search</span>
                  </button>
                </div>
              </div>
            )}

            {btnState === 'browse-jobs' && (
              <div className="flex flex-col gap-2 items-center ">
                <p className='text-white text-center text-sm sm:text-base md:text-lg'>Grow your freelancing career with opportunities from across the OIC.</p>
                <button
                  onClick={() => navigate('/browse-jobs')}
                  className="bg-teal-500 hover:bg-teal-600 text-white flex-1 h-10 rounded-md px-4 sm:px-5 py-2 transition duration-300 cursor-pointer"
                >
                  Explore Recently Posted Job
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <div className="mt-12 sm:mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Explore Categories
          </h2>
          <p className="text-gray-600">Find the perfect talent for your needs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => console.log('Navigate to:', cat.value)}
              onMouseEnter={() => setActiveCategory(i)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                activeCategory === i ? 'shadow-2xl' : 'shadow-lg'
              }`}
              style={{
                background: `linear-gradient(135deg, ${activeCategory === i ? 'rgb(249 250 251)' : 'white'})`,
                animationDelay: `${i * 0.1}s`
              }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cat.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {cat.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                  {cat.subtitle}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-lg`}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default Banner1;
