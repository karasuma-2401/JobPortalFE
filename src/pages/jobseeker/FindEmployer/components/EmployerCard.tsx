import { MapPin, Briefcase} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function EmployerCardItem({ employer }: EmployerCardProps) {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/find-employer/${employer.id}`);
  };

  return (
    <div 
      onDoubleClick={handleDoubleClick}
      className="bg-white border border-gray-100 p-5 rounded-xl flex items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer select-none group active:scale-[0.99]"
      title="Double click to view details"
    >
      <div className="flex items-center gap-4">
        <img 
          src={employer.logo} 
          alt={employer.name} 
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="text-left space-y-1">
          <h4 className="text-[16px] font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
            {employer.name}
          </h4>
          <div className="flex items-center gap-3 text-[13px] text-gray-400">
            <span className="flex items-center gap-1"><MapPin size={14} /> {employer.location}</span>
            <span className="flex items-center gap-1"><Briefcase size={14} /> {employer.openJobsCount} - open Job</span>
          </div>
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          navigate(`/find-employer/${employer.id}`);
        }}
        className="px-4 py-2.5 bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white rounded-lg text-[14px] font-semibold flex items-center gap-2 transition-all"
      >
        Open Position →
      </button>
    </div>
  );
}