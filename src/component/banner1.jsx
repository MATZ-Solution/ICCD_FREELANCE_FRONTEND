import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerVideo from '../assets/homevideo.mp4';
import { Palette, Megaphone, PenTool, Video, Code } from "lucide-react";

const Banner1 = () => {

  const navigate = useNavigate();
  const [btnState, setBtnState] = useState('find-talent');
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/find-talent?search=${encodeURIComponent(search)}`);
    }
  };

  const categories = [
    {
      title: "Graphics & Design",
      value:  "Graphics and Design",
      subtitle: "Creative visual content",
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      bg: "bg-pink-100"
    },
    {
      title: "Digital Marketing",
      value:  "Digital Marketing",
      subtitle: "Grow your audience",
      icon: <Megaphone className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100"
    },
    {
      title: "Writing and Translation",
      value:  "Digital Marketing",
      subtitle: "Words that connect",
      icon: <PenTool className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-100"
    },
    {
      title: "Video & Animation",
      value:  "Video and Animation",
      subtitle: "Bring stories to life",
      icon: <Video className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100"
    },
    {
      title: "Programming & Tech",
      value:  "Programming and Tech",
      subtitle: "Code and innovation",
      icon: <Code className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="relative flex flex-col md:flex-row items-center justify-between w-full h-[75vh] p-6 md:p-12 rounded-4xl shadow-lg overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl"
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-4xl" />

        {/* Content */}
        <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
          <h1 className="text-3xl capitalize sm:text-4xl md:text-5xl  font-bold text-white leading-snug md:leading-tight mb-6">
            Your Gateway to Opportunity, Growth, and Collaboration
          </h1>

          <div className="bg-black/30 rounded-xl p-5 sm:max-w-full md:max-w-[90%] lg:max-w-[70%]">
            {/* Tabs */}
            <div className="flex overflow-hidden rounded-full mb-5 bg-black/50 p-2">
              <button
                onClick={() => setBtnState('find-talent')}
                className={` ${btnState === 'find-talent' ? 'bg-white text-black' : 'text-white'} flex-1 h-10 rounded-full  transition duration-300 cursor-pointer`}
              >
                Find Talent
              </button>
              <button
                onClick={() => setBtnState('browse-jobs')}
                className={`${btnState === 'browse-jobs' ? 'bg-white text-black' : 'text-white'} flex-1 h-10 rounded-full transition duration-300 cursor-pointer`}
              >
                Browse Job
              </button>
            </div>

            {/* Search Bar */}
            {btnState === 'find-talent' && (
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by role, skills, or keywords"
                  className="w-full h-14 rounded-full px-5 bg-black/40 placeholder-gray-400 text-white text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                {/* Desktop Search Button */}
                <button
                  onClick={handleSearch}
                  className="hidden sm:flex absolute right-2 top-1 h-12 px-5 rounded-full bg-teal-500 hover:bg-teal-600 text-white items-center gap-2 transition duration-300"
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
                <p className='text-white text-center text-lg'>Grow your freelancing career with opportunities from across the OIC.</p>
                <button
                  onClick={() => navigate('/browse-jobs')}
                  className={` bg-teal-500 hover:bg-teal-600 text-white flex-1 h-10 rounded-md px-5 py-2 transition duration-300 cursor-pointer`}
                >
                  Explore Recently Posted Job
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {categories.map((cat, i) => (
          <div
            onClick={() => navigate(`/find-talent?search=${encodeURIComponent(cat.value)}`)}
            key={i}
            className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className={`p-3 rounded-lg ${cat.bg}`}>
              {cat.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">{cat.title}</h3>
              <p className="text-xs text-gray-500">{cat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner1;
