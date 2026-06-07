import { MapPin, Briefcase, ArrowRight } from "lucide-react";

interface EmployerData {
  id: string;
  name: string;
  logo: string;
  location: string;
  openJobsCount: number;
}

interface EmployerListProps {
  employers: EmployerData[];
  viewMode: "list" | "grid";
  onEmployerDoubleClick: (id: string) => void;
}

export default function EmployerList({ employers, viewMode, onEmployerDoubleClick }: EmployerListProps) {
  return (
    <div className={`mt-6 gap-6 ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"}`}>
      {employers.map((employer) => (
        <div 
          key={employer.id}
          onDoubleClick={() => onEmployerDoubleClick(employer.id)}
          className={`bg-white border border-gray-100 rounded-xl flex hover:shadow-md hover:border-gray-200 transition-all cursor-pointer select-none group active:scale-[0.995] ${
            viewMode === "grid" 
              ? "flex-col p-6 items-start text-left gap-5" 
              : "flex-col sm:flex-row p-5 items-start sm:items-center justify-between gap-4"
          }`}
          title="Double click to view details"
        >
          <div className="flex items-center gap-4 text-left">
            <img 
              src={employer.logo} 
              alt={employer.name} 
              className="w-14 h-14 rounded-xl object-cover border border-gray-100 p-1 bg-white shadow-sm shrink-0"
            />
            <div className="space-y-1">
              <h4 className="text-[17px] font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                {employer.name}
              </h4>
              <div className="flex items-center gap-3.5 text-[13px] text-gray-400 flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={15} /> {employer.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={15} /> {employer.openJobsCount} Open Job</span>
              </div>
            </div>
          </div>


          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              onEmployerDoubleClick(employer.id);
            }}
            className={`font-semibold text-[14px] flex items-center justify-center gap-2 rounded-lg transition-all shrink-0 ${
              viewMode === "grid"
                ? "w-full py-3 bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white"
                : "w-full sm:w-auto px-5 py-2.5 bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white"
            }`}
          >
            <span>Open Position</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}