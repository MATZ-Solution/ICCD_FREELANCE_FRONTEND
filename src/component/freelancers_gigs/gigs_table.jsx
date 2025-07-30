import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useNavigate } from 'react-router-dom';

function Gigs_table({ data }) {
  // const statusColors = {
  //   'IN PROGRESS': 'bg-[#1467B0]',
  //   PENDING: 'bg-yellow-500',
  //   COMPLETED: 'bg-green-600',
  //   'IN REVIEW': 'bg-purple-500',
  //   'ON HOLD': 'bg-red-500',
  // };

  const navigate = useNavigate();
  console.log("data: ", data);

  return (
    <div className="py-6">
      <div className="overflow-x-auto w-full">
        <div className="min-w-full rounded-xl">
          <table className="min-w-full border-separate border-spacing-y-4 border-spacing-x-2">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td colSpan={6}>
                    <div className="w-full bg-[#F8F8F8] shadow-sm rounded-xl flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-4 py-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-full sm:w-40 h-20 flex justify-center items-center">
                        <img
                          src={item?.gigsFiles || order_logo}
                          alt="gig"
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>

                      {/* Title */}
                      <div className="flex flex-col w-full sm:w-1/2 md:w-[20%]">
                        <p className="text-sm text-[#737373]">Title:</p>
                        <p className="font-semibold text-base sm:text-lg text-[#043A53] truncate">{item?.title}</p>
                      </div>

                      {/* Clicks */}
                      {/* <div className="flex flex-col w-full sm:w-1/2 md:w-[15%]">
                        <p className="text-sm text-[#737373]">Clicks</p>
                        <p className="text-[#043A53] font-semibold text-base sm:text-lg">{item.due}</p>
                      </div> */}

                      {/* Category */}
                      <div className="flex flex-col w-full sm:w-1/2 md:w-[15%]">
                        <p className="text-sm text-[#737373]">Category</p>
                        <p className="text-[#043A53] font-semibold text-base sm:text-lg">{item?.category}</p>
                      </div>

                      <div className="flex flex-col w-full sm:w-1/2 md:w-[15%]">
                        <p className="text-sm text-[#737373]">Sub Category</p>
                        <p className="text-[#043A53] font-semibold text-base sm:text-lg">{item?.subCategory}</p>
                      </div>

                 {/* Edit Button */}
                <div className="w-full sm:w-auto md:w-[15%]">
                  <button
                    onClick={() => navigate(`/freelancer/manage-gigs/overview/edit/${item?.id}`)}
                    className="w-full sm:w-auto h-12 lg:h-16 lg:w-[160px] flex justify-center items-center bg-[#EDEDED] rounded-xl px-4 py-2 lg:px-6"
                  >
                    <p className="text-[#043A53] font-semibold text-sm sm:text-base lg:text-lg">Edit</p>
                  </button>
                </div>


                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Gigs_table;
