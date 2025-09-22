import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import { Palette, Megaphone, PenTool, Video, Code } from "lucide-react";

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
  // const categories = [
  //   {
  //     title: "Graphics & Design",
  //     subtitle: "Creative visual content",
  //     icon: <Palette className="w-6 h-6 text-pink-500" />,
  //     bg: "bg-pink-100"
  //   },
  //   {
  //     title: "Digital Marketing",
  //     subtitle: "Grow your audience",
  //     icon: <Megaphone className="w-6 h-6 text-green-600" />,
  //     bg: "bg-green-100"
  //   },
  //   {
  //     title: "Writing & Translation",
  //     subtitle: "Words that connect",
  //     icon: <PenTool className="w-6 h-6 text-indigo-600" />,
  //     bg: "bg-indigo-100"
  //   },
  //   {
  //     title: "Video & Animation",
  //     subtitle: "Bring stories to life",
  //     icon: <Video className="w-6 h-6 text-purple-600" />,
  //     bg: "bg-purple-100"
  //   },
  //   {
  //     title: "Programming & Tech",
  //     subtitle: "Code and innovation",
  //     icon: <Code className="w-6 h-6 text-orange-600" />,
  //     bg: "bg-orange-100"
  //   }
  // ];
  return (
    <div className="px-6  mt-10">
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

          {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className={`p-3 rounded-lg ${cat.bg}`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{cat.title}</h3>
                  <p className="text-xs text-gray-500">{cat.subtitle}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Banner5;
