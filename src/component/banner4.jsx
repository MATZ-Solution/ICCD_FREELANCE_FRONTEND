import EastIcon from '@mui/icons-material/East';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import { useNavigate } from 'react-router-dom';

const Banner4 = () => {
  const navigate = useNavigate();

  const topic = [
    { name: "Access a pool of top talent across 700 categories", icon: icon1 },
    { name: "Enjoy a simple, easy-to-use matching experience", icon: icon2 },
    { name: "Get quality work done quickly and within budget", icon: icon3 },
    { name: "Only pay when you’re happy", icon: icon4 },
  ];

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="group flex flex-col items-center justify-center p-6 md:p-12 rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        
        {/* Heading */}
        <div className="w-full text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-8 leading-snug">
            Make it all happen with{' '}
            <span className="text-[#01AEAD]">freelancers</span>
          </h1>

          {/* Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 sm:px-4">
            {topic.map((item, index) => (
              <div
                key={index}
                className={`feature-card flex flex-col items-center justify-center gap-4 text-center px-4 py-6 rounded-xl 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:bg-[#F6FEFE]
                ${
                  index !== 3
                    ? 'lg:border-r lg:border-r-[#15A9B2]/40'
                    : ''
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform duration-300"
                />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="cta-modern group flex items-center gap-3 px-7 py-3 bg-[#043A53] text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-[#05929c] hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <span>Get Started Now</span>
              <EastIcon
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'white' }}
              />
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Banner4;
