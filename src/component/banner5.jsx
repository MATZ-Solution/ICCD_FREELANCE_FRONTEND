import EastIcon from '@mui/icons-material/East';

const Banner5 = () => {
  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section className="flex flex-col items-center justify-between py-4 rounded-2xl md:p-12 md:flex-row">
        <div className="w-full  text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold text-black mb-4 sm:text-left sm:text-4xl md:text-5xl md:text-center ">
            Browse talent by category
          </h1>
          <p className="text-black font-semibold mb-6  sm:text-left md:text-center">
           Looking for work? <span className='text-[#15A9B2]'>Browse jobs</span>
          </p>

          <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 '>
            {
              Array.from({ length: 4 }).map((_,index)=>(
                <div className={`hover:bg-[#15A9B2] hover:text-white text-black w-full px-5 py-5 bg-gray-200 rounded-xl`}>
                  <h1 className=' text-xl font-semibold sm:text-2xl'>Post a job and hire a pro</h1>
                  <div className='mt-5 flex gap-3 items-center justify-center  md:justify-start'>
                    <p className=''> Talent Marketplace </p>
                    <EastIcon className=' ' />
                  </div>
                </div>

              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner5;
