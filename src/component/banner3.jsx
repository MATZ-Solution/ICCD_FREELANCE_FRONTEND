import bannerImage from '../../src/assets/banner_img_2.png';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';

const Banner3 = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Post a job and hire a pro',
      description: 'Talent Marketplace',
      bgColor: '#15A9B2',
      route: '/post-job',
    },
    {
      title: 'Browse and buy projects',
      description: 'Project Catalog',
      bgColor: '#043A53',
      route: '/browse-projects',
    },
    {
      title: 'Freelance services on demand',
      description: 'Gig Catalog',
      bgColor: '#14416B',
      route: '/find-talent',
    },
  ];

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section
        style={{ backgroundImage: `url(${bannerImage})` }}
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <div className="w-full text-center md:text-left mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight md:leading-tight max-w-full md:max-w-3xl mx-auto md:mx-0">
            Find talent your way
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-full md:max-w-md mx-auto md:mx-0 leading-relaxed">
            Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
          </p>

          {/* Cards */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.route)}
                style={{ backgroundColor: card.bgColor }}
                className="cursor-pointer flex flex-col justify-between items-start flex-1 px-4 sm:px-6 py-6 rounded-xl border-2 border-transparent hover:border-white transition duration-300"
              >
                <h2 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                  {card.title}
                </h2>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-white font-medium text-sm sm:text-base">
                    {card.description}
                  </span>
                  <EastIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner3;
