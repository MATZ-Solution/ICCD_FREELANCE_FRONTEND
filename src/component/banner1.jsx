import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import bannerVideo from "../assets/homevideo.mp4"; // your mp4 file

const Banner1 = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/find-talent?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="relative flex flex-col items-center w-full h-[75vh] justify-between p-6 md:p-12 rounded-4xl shadow-lg md:flex-row overflow-hidden">

        {/* Background Video */}
        <video
          className="absolute top-0 backdrop-blur-lg left-0 w-full h-full object-cover rounded-4xl"
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30 rounded-4xl" />

        {/* Content */}
        <div className="relative w-full text-center md:text-left md:w-2/3 z-10">
          <h1 className="text-3xl capitalize sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug md:leading-tight mb-6">
            Connecting clients in need to freelancers who deliver
          </h1>

          <div className="w-full bg- rounded-xl p-5 sm:max-w-full md:max-w-[90%] lg:max-w-[70%]">
            {/* Tabs */}
            <div className="bg-black/40 p-2 rounded-full flex overflow-hidden mb-5">
              <button
                className="h-10 text-white flex-1 rounded-full border-2 border-transparent hover:border-white transition"
                onClick={() => navigate('/find-talent')}
              >
                Find Talent
              </button>
              <button
                className="h-10 text-white flex-1 rounded-full border-2 border-transparent hover:border-white transition"
                onClick={() => navigate('/browse-jobs')}
              >
                Browse Job
              </button>
            </div>

            {/* Search bar */}
            <div className="relative">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="w-full h-14 rounded-full px-5 text-base sm:text-lg bg-black/40 placeholder-gray-400"
                placeholder="Search by role, skills, or keywords"
              />

              {/* Desktop Search Button */}
              <button
                onClick={handleSearch}
                className="hidden sm:flex absolute right-2 top-1 bg-black/40 text-white h-12 rounded-full px-5 items-center justify-center gap-2 cursor-pointer transition"
              >
                <SearchIcon style={{ color: '#15A9B2', width: '25px', height: '25px' }} />
                <span className="text-white text-sm sm:text-base">Search</span>
              </button>

              {/* Mobile Search Button */}
              <div className="mt-3 flex items-center justify-center sm:hidden">
                <button
                  onClick={handleSearch}
                  className="w-full bg-black text-white h-11 rounded-full flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <SearchIcon style={{ color: '#15A9B2', width: '25px', height: '25px' }} />
                  <span className="text-white text-base">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner1;
