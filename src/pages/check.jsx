import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const categories = [
  { name: 'Trending', icon: <WhatshotIcon className="w-4 h-4 mr-1 text-red-500" /> },
  'Graphics & Design',
  'Programming & Tech',
  'Digital Marketing',
  'Video & Animation',
  'Writing & Translation',
  'Music & Audio',
  'Business',
  'Finance',
  'AI Services',
  'AI Services',
  'AI Services',
  'AI Services',
];

const Check = () => {
  return (
    <div className="bg-white">
      <div className="flex space-x-4 overflow-x-auto p-2 hide-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-200 focus:outline-none"
          >
            {typeof cat === 'object' ? (
              <>
                <span className='flex items-center'>{cat.icon}{cat.name}</span>
              </>
            ) : (
              cat
            )}
          </button>
        ))}
      </div>

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Check;