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
        className="bg-cover bg-no-repeat flex flex-col items-center justify-between p-6 md:p-12 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <div className="w-full text-center md:text-left mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:w-3/4 mx-auto md:mx-0">
            Find talent your way
          </h1>
          <p className="text-white text-base sm:text-lg mb-10 md:w-96 mx-auto md:mx-0">
            Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
          </p>

          {/* Cards - Full Width */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.route)}
                style={{ backgroundColor: card.bgColor }}
                className="cursor-pointer  items-center flex-1 px-6 py-6 rounded-xl border-2 border-transparent hover:border-white transition duration-300 flex flex-col justify-between"
              >
                <h2 className="text-white text-xl font-semibold mb-4">{card.title}</h2>
                <div className="flex items-center gap-2 justify-start mt-auto">
                  <span className="text-white font-medium">{card.description}</span>
                  <EastIcon className="text-white" fontSize="small" />
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
