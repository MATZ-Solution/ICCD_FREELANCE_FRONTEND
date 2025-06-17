import Card2 from './card2';

const Banner5 = () => {
  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section className="flex flex-col items-center justify-between p-4 rounded-2xl md:p-12 md:flex-row">
        <div className="w-full  text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold text-black mb-4 sm:text-4xl md:text-5xl  ">
            Browse talent by category
          </h1>
          <p className="text-black font-semibold mb-6 sm:w-96">
           Looking for work? <span className='text-[#15A9B2]'>Browse jobs</span>
          </p>

          <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 '>
            <Card2
              text1='Post a job and hire a pro'
              text2='Talent Marketplace'
              bgColor='bg-gray-200'
            />
            <Card2
              text1='Browse and buy projects'
              text2='Project Catalog'
              bgColor='bg-gray-200'
            />
            <Card2
              text1='Get advice from an Industry expert'
              text2='Consultations'
              bgColor='bg-gray-200'
            />
            <Card2
              text1='Get advice from an Industry expert'
              text2='Consultations'
              bgColor='bg-gray-200'
            />
          </div>
        </div>

        {/* Right Image */}
      </section>
    </div>
  );
};

export default Banner5;
