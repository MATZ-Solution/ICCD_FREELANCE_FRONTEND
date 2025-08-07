import bannerImage from '../../src/assets/banner_img_3.png'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Banner1 = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section
        style={{ backgroundImage: `url(${bannerImage})` }}
        className=" bg-cover bg-no-repeat flex flex-col  items-center justify-between p-4 md:p-12 rounded-2xl shadow-lg md:flex-row">


        <div className="w-full text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold text-white mb-4 sm:text-4xl md:text-5xl md:w-[90%] md:font-semibold lg:text-7xl lg:w-[70%]">
            Connecting clients in need to freelancers who deliver
          </h1>

          <div className=' w-full bg-[#343434] rounded-xl px-5 py-5 sm:w-full md:max-w-[80%] lg:w-[50%] lg:mt-20'>
            <div className='bg-[#676162] rounded-full flex '>
              <button
                className='h-10 text-white w-full rounded-full border-2 border-transparent hover:border-white'
                onClick={() => navigate('/find-talent')}
              >
                Find Talent
              </button>     
                      <button
                className='h-10 text-white w-full rounded-full border-2 border-transparent hover:border-white'
                onClick={() => navigate('/browse-jobs')}
              >
                Browse Job
              </button>
            </div>
            <div className='relative mt-5'>
              <input onChange={(e) => setSearch(e.target.value)} className=' w-full h-12 rounded-full p-5 bg-white' placeholder='Search by role, skills, or keywords' />

              <button onClick={()=> search && navigate(`/find-talent?search=${search}`)} className='hidden absolute right-2 top-1 bg-black text-white h-10 rounded-full w-28 flex items-center justify-center gap-1 cursor-pointer sm:flex'>
                <SearchIcon style={{ color: '#15A9B2', width: '30px', height: '25px' }} />
                <p className=' text-white '>Search</p>
              </button>

              <div className='mt-3 flex items-center justify-center sm:hidden'>
                <button className='w-full bg-black text-white h-12 rounded-full w-28 flex items-center justify-center gap-1 cursor-pointer'>
                  <SearchIcon style={{ color: '#15A9B2', width: '30px', height: '25px' }} />
                  <p className=' text-white '>Search</p>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Right Image */}
      </section>
    </div>
  );
};

export default Banner1;
