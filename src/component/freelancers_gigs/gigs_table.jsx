import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useNavigate } from 'react-router-dom';

function Gigs_table({ data }) {
  const navigate = useNavigate();

  return (
    <div className="py-4 sm:py-6 w-full">
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-[#F8F8F8] shadow-sm rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 px-4 py-4 sm:px-6"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-20 sm:h-24 rounded-md overflow-hidden">
              <img
                src={item?.gigsFiles || order_logo}
                alt="gig"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {/* Title */}
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-[#737373]">Title</p>
                <p className="font-semibold text-sm sm:text-base md:text-lg text-[#043A53] truncate">{item?.title}</p>
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-[#737373]">Category</p>
                <p className="font-semibold text-sm sm:text-base md:text-lg text-[#043A53]">{item?.category}</p>
              </div>

              {/* Sub Category */}
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-[#737373]">Sub Category</p>
                <p className="font-semibold text-sm sm:text-base md:text-lg text-[#043A53]">{item?.subCategory}</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="w-full sm:w-auto">
              <button
                onClick={() => navigate(`/freelancer/manage-gigs/overview/edit/${item?.id}`)}
                className="w-full sm:w-28 md:w-32 h-10 sm:h-12 flex justify-center items-center bg-[#EDEDED] rounded-lg px-4 sm:px-6 hover:bg-[#d1d1d1] transition-colors"
              >
                <p className="text-[#043A53] font-semibold text-sm sm:text-base">Edit</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gigs_table;