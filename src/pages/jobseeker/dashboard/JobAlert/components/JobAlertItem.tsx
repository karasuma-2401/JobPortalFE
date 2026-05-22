import { Bookmark, MapPin, DollarSign, CalendarDays, ArrowRight } from "lucide-react";

export interface JobAlertItemProps {
  id: string;
  logo: string;
  role: string;
  type: string;
  location: string;
  salary: string;
  daysRemaining: string;
  active?: boolean;
}

export default function JobAlertItem({
  logo,
  role,
  type,
  location,
  salary,
  daysRemaining,
  active = false
}: JobAlertItemProps) {
  return (
    <div className={`flex items-center justify-between p-6 border rounded-xl bg-white transition-all ${
      active ? "border-primary-500 shadow-sm ring-1 ring-primary-500/10" : "border-gray-100"
    }`}>
      <div className="flex items-center gap-6 flex-1">
        <img src={logo} alt={role} className="w-14 h-14 rounded-full object-cover shrink-0" />
        
        <div className="flex-1 space-y-1.5 text-left">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-gray-900">{role}</h3>
            <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
              type === "Full Time" ? "bg-blue-50 text-primary-500" : "bg-orange-50 text-warning-500"
            }`}>
              {type}
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              {location}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-400" />
              {salary}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gray-400" />
              {daysRemaining}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-primary-500 transition-colors">
          <Bookmark size={20} className={active ? "text-gray-400" : ""} />
        </button>
        <button className="px-6 py-3.5 flex items-center gap-3 text-[15px] font-bold rounded-lg transition-colors bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white">
          Apply Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}