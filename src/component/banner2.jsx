import { useNavigate } from 'react-router-dom';
import bannerImage from '../../src/assets/banner_img_1.png';
import EastIcon from '@mui/icons-material/East';

const Banner2 = () => {
  const navigate = useNavigate();

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="group bg-gradient-to-t from-[#1B2A39] to-[#15A9B2] flex flex-col-reverse md:flex-row items-center justify-between p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug">
            Instant results. Top talent.
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
            Get what you need faster from freelancers who trained their own personal AI Creation Models. Browse, prompt, and generate instantly — tweaks included.
          </p>

          <div className="flex items-center justify-center md:justify-start">
            <button
              onClick={() => navigate('/signup')}
              className="cta-btn flex items-center gap-3 bg-[#15A9B2] px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#05929c] hover:scale-105 active:scale-95"
            >
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
                Get Started Now
              </span>

              <EastIcon
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'white' }}
              />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
          <img
            src={bannerImage}
            alt="Banner Illustration"
            className="banner-image w-full max-w-[400px] sm:max-w-[500px] md:max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

      </section>
    </div>
  );
};

export default Banner2;
