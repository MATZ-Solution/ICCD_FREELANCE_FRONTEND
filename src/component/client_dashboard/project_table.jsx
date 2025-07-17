import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Projects_table({ data }) {

  const pathName = useLocation().pathname
  console.log("pathName : ", pathName)

  const navigate = useNavigate()
  const statusColors = {
    'IN PROGRESS': 'bg-[#1467B0]',
    PENDING: 'bg-yellow-500',
    COMPLETED: 'bg-green-600',
    'IN REVIEW': 'bg-purple-500',
    'ON HOLD': 'bg-red-500',
  };

  console.log("data: ", data)
  const handleNavigate = (id)=> {
    if(pathName.includes('client')){
      navigate(`/client/projects/${id}`)
    }else{
      navigate(`/freelancer/projects/${id}`)
    }
  }

  return (
    <div className="py-6">
      <div className="overflow-x-auto w-full">
        <div className="min-w-[1000px] rounded-xl">
          <table className="min-w-full border-separate border-spacing-y-4 border-spacing-x-4">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td colSpan={6}>
                    <div
                      onClick={() => handleNavigate(item?.id)}
                      className="w-full bg-[#F8F8F8] shadow-sm rounded-xl flex items-center justify-between px-4 py-3 gap-4 min-w-[1000px] hover:cursor-pointer">
                      {/* First Column */}
                      <div className="flex items-center gap-5 w-[20%]">
                        <img src={item?.projectFiles} className="w-40 h-20" />
                      </div>

                      {/* Second Column */}
                      <div className="w-[20%]">
                        <p className="text-[#737373]">
                          Project Name:
                        </p>
                        <p className="font-semibold text-lg text-[#043A53]">{item?.title}</p>
                      </div>

                      {/* Price */}
                      <div className="w-[15%]">
                        <p className="text-[#737373]">Budget</p>
                        <p className="text-[#043A53] text-lg font-semibold">{item?.budget}</p>
                      </div>

                      {/* Due */}
                      <div className="w-[15%]">
                        <p className="text-[#737373]">Deadline</p>
                        <p className="text-[#043A53] text-lg font-semibold">{item?.deadline}</p>
                      </div>

                      {/* Category */}
                      <div className="w-[15%]">
                        <p className="text-[#737373]">Category</p>
                        <p className="text-[#043A53] text-lg font-semibold">{item?.category}</p>
                      </div>

                      {/* View */}
                      <div className="w-[15%]">
                        <button className="w-full h-16 flex justify-center items-center mt-2 bg-[#EDEDED] rounded-2xl p-3">
                          <p className="text-[#043A53] font-semibold">View</p>
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
  )
}

export default Projects_table