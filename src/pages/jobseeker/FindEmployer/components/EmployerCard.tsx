import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export interface Employer {
  id: string;
  name: string;
  logo: string;
  location: string;
  openJobsCount: number;
}

interface EmployerCardProps {
  employer: Employer;
}

export default function EmployerCard({ employer }: EmployerCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all gap-4">
      <div className="flex items-center gap-5">
        <img 
          src={employer.logo} 
          alt={employer.name} 
          className="w-14 h-14 rounded-xl object-cover border border-gray-100 p-1 bg-white shrink-0 shadow-sm"
        />
        <div className="space-y-1.5 text-left">
          <h3 className="text-[18px] font-bold text-gray-900 hover:text-primary-500 transition-colors cursor-pointer">
            {employer.name}
          </h3>
          <div className="flex items-center gap-4 text-[14px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-gray-400" /> {employer.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={16} className="text-gray-400" /> {employer.openJobsCount} - open Job
            </span>
          </div>
        </div>
      </div>

      <button className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-[14px] font-bold rounded-lg text-primary-500 bg-blue-50 hover:bg-primary-500 hover:text-white transition-all group shrink-0">
        <span>Open Position</span>
        <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}