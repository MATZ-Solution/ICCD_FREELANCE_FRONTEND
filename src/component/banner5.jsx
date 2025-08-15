import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';

const Banner5 = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Browse Jobs',
      description: 'Explore open roles and apply directly',
      linkText: 'Job Marketplace',
      route: '/browse-jobs',
    },
    {
      title: 'Browse Projects',
      description: 'Find ready-to-start freelance projects',
      linkText: 'Projects Board',
      route: '/browse-projects',
    },
    {
      title: 'Browse Services',
      description: 'Quick freelance tasks ready to grab',
      linkText: 'Gig Catalog',
      route: '/find-talent',
    },
  ];

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="flex flex-col items-center md:flex-row md:justify-between md:p-12">
        <div className="w-full text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Browse Talent by Category
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Looking for work?{' '}
            <span className="text-[#15A9B2] cursor-pointer hover:underline">
              Browse jobs
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.route)}
                className="cursor-pointer flex flex-col items-center justify-center group rounded-xl bg-gray-100 px-6 py-6 hover:bg-[#15A9B2] hover:text-white transition-colors duration-300 shadow-md"
              >
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">{card.title}</h2>
                <p className="text-gray-700 group-hover:text-white mb-4">{card.description}</p>
                <div className="flex items-center gap-2 text-[#15A9B2] group-hover:text-white font-medium">
                  <span className='group-hover:text-white' >{card.linkText}</span>
                  <EastIcon fontSize="small" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner5;
