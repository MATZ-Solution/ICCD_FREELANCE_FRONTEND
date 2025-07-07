import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function DCard({
  title = "Default Title",
  value = "0",
  subtitle,
  month,
  icon = null,
  bottomText,
  variant = "purple",
}) {
  const COLOR_VARIANTS = {
    purple: "#6F42C1",
    green: "#3DBF07",
    blue: "#3598DB",
    teal: "#007980",
    brown: "#AE9389",
    indigo: "#5C6B9C",
  };

  const bgColor = COLOR_VARIANTS[variant] || "#6F42C1";

  return (
    <div
      className="rounded-xl p-4 text-white hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden"
      style={{ backgroundColor: bgColor, minHeight: "120px" }}
    >
      {/* BACKGROUND BARS */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between items-end  h-full z-0">
        <div className="bg-white/30 w-1/5 h-[20%]"></div>
        <div className="bg-white/40 w-1/5 h-[30%]"></div>
        <div className="bg-white/50 w-1/5 h-[40%]"></div>
      </div>



      {/* MAIN CONTENT */}
      <div className="relative mb-2 z-10 flex items-start gap-3">

        {icon && (
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}


        <div className="flex flex-col">
          <p className="text-white/70 text-wrap text-sm">{title}</p>

          <p className="text-2xl font-bold mb-0">{value}</p>

          {month && subtitle && (
            <div className="flex mb-4 text-wrap items-center gap-2">
              <span className="text-xs text-white/70">{subtitle} <span className="font-bold" >{month}</span> </span>

            </div>
          )}

          {bottomText && (
            <p className="text-xs text-white/70 mt-2">{bottomText}</p>
          )}

          {/* Sort Icon Button */}
          {/* <div className="flex flex-wrap   z-10">
            <button className="flex  gap-1 bg-white/10 text-white text-xs rounded-md hover:bg-white/20 transition">
              <CalendarMonthIcon className="text-sm" />
              Sort by
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}