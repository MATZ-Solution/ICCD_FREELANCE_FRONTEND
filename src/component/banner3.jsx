import bannerImage from '../../src/assets/banner_img_2.png'
import Card1 from './card1';

const Banner3 = () => {
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

          <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <Card1
              text1='Post a job and hire a pro'
              text2='Talent Marketplace'
              bgColor='bg-[#15A9B2]'
            />
            <Card1
              text1='Browse and buy projects'
              text2='Project Catalog'
              bgColor='bg-[#043A53]'
            />
            <Card1
              text1='Get advice from an Industry expert'
              text2='Consultations'
              bgColor='bg-[#263238]'
            />
          </div>
        </div>

        {/* Right Image */}
      </section>
    </div>
  );
};

export default Banner3;
