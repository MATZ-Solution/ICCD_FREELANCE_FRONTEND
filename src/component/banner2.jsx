import { useNavigate } from 'react-router-dom';
import bannerImage from '../../src/assets/banner_img_1.png';
import EastIcon from '@mui/icons-material/East';

const Banner2 = () => {
  const navigate = useNavigate();

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="bg-gradient-to-t from-[#1B2A39] to-[#15A9B2] flex flex-col md:flex-row items-center justify-between p-6 md:p-12 rounded-2xl shadow-lg">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Instant results. Top talent.
          </h1>
          <p className="text-white text-base sm:text-lg mb-6">
            Get what you need faster from freelancers who trained their own personal AI Creation Models. Now you can browse, prompt, and generate instantly. And if you need a tweak or change, the freelancer is always there to help you perfect it.
          </p>
          <div className="flex items-center justify-center md:justify-start">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-3 bg-[#15A9B2] px-6 py-3 rounded-full shadow-lg hover:bg-[#05929c] transition duration-300"
            >
              <span className="text-white font-semibold text-base sm:text-lg">Get Started Now</span>
              <EastIcon style={{ color: 'white' }} />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
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
