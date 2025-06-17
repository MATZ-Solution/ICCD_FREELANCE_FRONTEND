import Card2 from './card2';

const Banner6 = () => {
  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section className="flex flex-col  items-center justify-between p-4 rounded-2xl md:p-12 md:flex-row">
        <div className="w-full  text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-semibold text-black mb-4 lg:w-[50%] lg:leading-13  md:text-5xl ">
            Trusted by Leading <span className='text-[#15A9B2]'>Brands and Startups</span>
          </h1>
         
          <div className='mt-10 w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 '>
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

export default Banner6;
