import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation } from 'react-router-dom';

function BreadCrumbs() {

  const data = ['overview', 'pricing', 'description', 'requirements', 'gallery', 'publish'];
  const location = useLocation();
  const pathName = location.pathname.split("/")[2]

  return (
    <div className="flex flex-wrap items-center  gap-4 sm:gap-6 md:gap-7">
      {data.map((item, index) => {
        const getIndex = data.indexOf(pathName)
        return (
          <div key={index} className="flex items-center gap-2">
            {/* Circle */}
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full text-sm 
                ${getIndex >= index ? 'bg-[#01AEAD] text-white' : 'bg-white border border-[#8D8C8C] text-[#8D8C8C]'}`}
            >
              <p>{index + 1}</p>
            </div>

            {/* Label + Arrow */}
            <div
              className={`flex items-center text-sm 
                ${getIndex >= index ? 'text-black' : 'text-[#8D8C8C]'}`}
            >
              <p className="whitespace-nowrap capitalize text-xs sm:text-sm">{item}</p>

              {/* Hide arrow on last item */}
              {index < data.length - 1 && (
                <KeyboardArrowRightIcon style={{ scale: 0.7 }} className="text-base sm:text-lg" />
              )}
            </div>
          </div>
        )
      }
      )}
    </div>
  );
}

export default BreadCrumbs;
