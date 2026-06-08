import { SlidersHorizontal } from "lucide-react";

interface FilterSidebarProps {
  radius: number;
  setRadius: (val: number) => void;
  orgType: string;
  setOrgType: (val: string) => void;
}

const ORG_TYPES = ["Government", "Semi Government", "NGO", "Private Company", "International Agencies", "Others"];

export default function EmployerFilterSidebar({ radius, setRadius, orgType, setOrgType }: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Header Filter */}
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white text-[15px] font-bold rounded-lg shadow-sm hover:bg-primary-600 transition-colors">
        <SlidersHorizontal size={18} />
        <span>Filter</span>
      </button>

      {/* Main Filter Box */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-8">
        
        {/* Radius Filter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-bold text-gray-900">Location Radius:</span>
            <span className="text-[15px] font-bold text-primary-500">{radius} miles</span>
          </div>
          <input 
            type="range" min="5" max="100" 
            value={radius} onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
        </div>

        <hr className="border-gray-100" />

        {/* Org Type Filter */}
        <div className="space-y-4">
          <span className="text-[15px] font-bold text-gray-900 block">Organization Type</span>
          <div className="space-y-3.5">
            {ORG_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group text-[14px]">
                <input 
                  type="radio" name="orgType"
                  checked={orgType === type}
                  onChange={() => setOrgType(type)}
                  className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500 cursor-pointer"
                />
                <span className={`transition-colors ${orgType === type ? "text-gray-900 font-semibold" : "text-gray-500 group-hover:text-gray-800"}`}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}