import bannerImage from '../../src/assets/banner_img_1.png'
import EastIcon from '@mui/icons-material/East';


const Banner2 = () => {
  return (
    <div className='px-3 sm:px-10 mt-10'>
      <section className="bg-gradient-to-t from-[#1B2A39] to-[#15A9B2] flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-12 rounded-2xl shadow-lg">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-white mb-4 md:text-3xl lg:text-4xl">
            Instant results. Top talent.
          </h1>
          <p className="text-white mb-6 ">
            Get what you need faster from freelancers who trained their own personalAI Creation Models. Now you can browse, prompt, and generate instantly. And if you need a tweak or change, the freelancer is always there to help you perfect it.
          </p>
          <div className='flex items-center justify-center md:justify-start'>
            <button className="shadow-xl/20 flex gap-3 bg-[#15A9B2] text-white px-6 py-3 rounded-full hover:bg-[#05929c] transition cursor">
              <p className='text-white'>Get Started Now</p>
              <EastIcon />
            </button>
          </div>

        </div>

        {/* Right Image */}
        <div className="w-full sm:w-1/2">
          <img
            src={bannerImage}
            alt="Banner Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default Banner2;
