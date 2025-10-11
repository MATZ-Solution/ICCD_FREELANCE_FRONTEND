import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerVideo from '../assets/homevideo.mp4';

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
          <h1 className="text-3xl capitalize sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug md:leading-tight mb-6">
            Connecting clients in need to freelancers who deliver
          </h1>

          <div className="bg-black/30 rounded-xl p-5 sm:max-w-full md:max-w-[90%] lg:max-w-[70%]">
            {/* Tabs */}
            <div className="flex overflow-hidden rounded-full mb-5 bg-black/50 p-2">
              <button
                onClick={() => navigate('/find-talent')}
                className="flex-1 h-10 rounded-full text-white hover:bg-white hover:text-black transition duration-300"
              >
                Find Talent
              </button>
              <button
                onClick={() => navigate('/browse-jobs')}
                className="flex-1 h-10 rounded-full text-white hover:bg-white hover:text-black transition duration-300"
              >
                Browse Job
              </button>
            </div>

            {/* Search Bar */}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner1;
