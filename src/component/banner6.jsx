const Banner6 = () => {
  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section className="flex flex-col  items-center justify-between p-4 rounded-2xl md:p-12 md:flex-row">
        <div className="w-full  text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-semibold text-black mb-4 lg:w-[50%] lg:leading-13  md:text-5xl ">
            Trusted by Leading <span className='text-[#15A9B2]'>Brands and Startups</span>
          </h1>

          <div className='mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ' >

            <div className=' w-full'>
              <div className={`w-full px-5 py-5 bg-[#14416B] rounded-xl`}>
                <h1 className=' text-white  font-semibold'>“If we didn't have Upwork… the quality of talent wouldn't be as easy to measure, and we wouldn't have the incredible support we get from the Upwork team.”</h1>
                <p className='mt-5 text-white text-xs'>Jessica Khawaja, VP of People Operations</p>
              </div>
            </div>

            <div className=' w-full  '>
              <div className={`w-full px-5 py-5 bg-[#15A9B2] rounded-xl`}>
                <h1 className=' text-white  font-semibold'>“If we didn't have Upwork… the quality of talent wouldn't be as easy to measure, and we wouldn't have the incredible support we get from the Upwork team.”</h1>
                <p className='mt-5 text-white text-xs'>Jessica Khawaja, VP of People Operations</p>
              </div>
            </div>

            <div className=' w-full '>
              <div className={`w-full px-5 py-5 bg-[#14416B] rounded-xl`}>
                <h1 className=' text-white  font-semibold'>“If we didn't have Upwork… the quality of talent wouldn't be as easy to measure, and we wouldn't have the incredible support we get from the Upwork team.”</h1>
                <p className='mt-5 text-white text-xs'>Jessica Khawaja, VP of People Operations</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Image */}
      </section>
    </div>
  );
};

export default Banner6;
