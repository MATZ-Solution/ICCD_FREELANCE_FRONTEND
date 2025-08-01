import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { memo } from 'react';

function DCard({
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
      className="relative rounded-2xl p-5 text-white overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
      style={{ backgroundColor: bgColor, minHeight: "130px" }}
    >
      {/* BACKGROUND BARS (glass-like) */}
      <div className="absolute inset-0 flex justify-between items-end z-0">
        <div className="bg-white/20 w-1/5 h-[25%] rounded-t-md"></div>
        <div className="bg-white/30 w-1/5 h-[40%] rounded-t-md"></div>
        <div className="bg-white/40 w-1/5 h-[55%] rounded-t-md"></div>
        <div className="bg-white/20 w-1/5 h-[35%] rounded-t-md"></div>
        <div className="bg-white/30 w-1/5 h-[20%] rounded-t-md"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex gap-4 items-start">
        {/* Icon */}
        {icon && (
          <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shadow-inner">
            {icon}
          </div>
        )}

        {/* Text */}
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-sm text-white/80 font-medium leading-tight">{title}</p>
          <p className="text-3xl font-bold leading-none">{value}</p>

          {subtitle && month && (
            <div className="text-xs text-white/70 mt-1">
              {subtitle} <span className="font-semibold text-white">{month}</span>
            </div>
          )}

          {bottomText && (
            <p className="text-xs text-white/70 mt-2">{bottomText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(DCard);
