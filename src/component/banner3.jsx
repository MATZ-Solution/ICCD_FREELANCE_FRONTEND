import bannerImage from '../../src/assets/banner_img_2.png'
import EastIcon from '@mui/icons-material/East';
import {  useNavigate } from 'react-router-dom';
const Banner3 = () => {

  const Navigate = useNavigate();
  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section
        style={{ backgroundImage: `url(${bannerImage})` }}
        className=" bg-cover bg-no-repeat flex flex-col md:flex-row items-center justify-between p-4 md:p-12 rounded-2xl shadow-lg">


        <div className="w-full  text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl md:text-5xl md:w-72 font-bold text-white mb-4">
            Find talent your way
          </h1>
          <p className="text-white mb-6 sm:w-96">
            Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
          </p>

          <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
            <div  onClick={() => Navigate('/post-job')}  className={`border-2 border-transparent hover:border-white w-full px-10 py-5 bg-[#15A9B2] rounded-xl`}>
              <h1 className=' text-white text-2xl font-semibold'>Post a job and hire a pro</h1>
              <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                <p className='text-white'> Talent Marketplace </p>
                <EastIcon className=' text-white' />
              </div>
            </div>

             <div  onClick={() => Navigate('browse-projects')}  className={`border-2 border-transparent hover:border-white w-full px-10 py-5 bg-[#043A53] rounded-xl`}>
              <h1 className=' text-white text-2xl font-semibold'>Browse and buy projects</h1>
              <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                <p className='text-white'> Project Catalog </p>
                <EastIcon className=' text-white' />
              </div>
            </div>

             {/* <div className={`border-2 border-transparent hover:border-white w-full px-10 py-5 bg-[#263238] rounded-xl`}>
              <h1 className=' text-white text-2xl font-semibold'>Post a job and hire a pro</h1>
              <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                <p className='text-white'> Talent Marketplace </p>
                <EastIcon className=' text-white' />
              </div>
            </div> */}

          </div>
        </div>

        {/* Right Image */}
      </section>
    </div>
  );
};

export default Banner3;
