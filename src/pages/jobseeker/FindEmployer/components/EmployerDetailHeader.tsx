import { Briefcase } from "lucide-react";

interface EmployerHeaderProps {
  name: string;
  logo: string;
  category: string;
  onViewPositions: () => void;
}

export default function EmployerDetailHeader({ name, logo, category, onViewPositions }: EmployerHeaderProps) {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
      <div className="flex items-center gap-5">
        <img 
          src={logo} 
          alt={name} 
          className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm"
        />
        <div className="space-y-1">
          <h1 className="text-[24px] font-bold text-gray-900">{name}</h1>
          <div className="flex items-center gap-2 text-[14px] text-gray-500">
            <Briefcase size={16} className="text-gray-400" />
            <span>{category}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onViewPositions}
        className="w-full sm:w-auto px-6 py-3 bg-primary-500 text-white font-bold text-[15px] rounded-lg hover:bg-primary-600 active:scale-[0.98] transition-all shadow-sm"
      >
        View Open Position →
      </button>
    </div>
  );
}