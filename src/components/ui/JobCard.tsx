import { MapPin, Calendar } from "lucide-react";

interface JobCardProps {
  logo: string;
  companyName: string;
  location: string;
  title: string;
  type: string;
  salary: string;
  daysRemaining: string; 
  isFeatured?: boolean;
  onDoubleClick?: () => void;
}

export default function JobCard({
  logo,
  companyName,
  location,
  title,
  type,
  salary,
  daysRemaining,
  isFeatured,
  onDoubleClick 
}: JobCardProps) {
  return (
    <div 
      onDoubleClick={onDoubleClick} 
      className={`group border rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-primary-500 cursor-pointer h-full ${
        isFeatured 
          ? "bg-[#FDF8F4] border-[#FFEAD8]" 
          : "bg-white border-gray-100"
      }`}
    >
      
      <div>
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt={companyName} 
            className="w-12 h-12 rounded-lg object-contain bg-white border border-gray-100 p-2 shrink-0" 
          />
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-semibold text-gray-800 truncate">
                {companyName}
              </span>
              {isFeatured && (
                <span className="bg-[#FFEEEC] text-[#FF4F4F] text-[11px] font-medium px-2 py-0.5 rounded">
                  FEATURED
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-[13px]">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onDoubleClick}
          className="mt-4 line-clamp-2 text-left text-[16px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-500"
        >
          {title}
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-gray-100/70 pt-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="bg-primary-50 text-primary-600 font-medium px-2.5 py-1 rounded-md text-[12px]">
            {type}
          </span>
          <span className="text-gray-700 font-semibold">
            {salary}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-400 text-[13px] mt-1 whitespace-nowrap">
          <Calendar size={14} className="shrink-0" />
          <span>{daysRemaining}</span>
        </div>
      </div>

    </div>
  );
}
