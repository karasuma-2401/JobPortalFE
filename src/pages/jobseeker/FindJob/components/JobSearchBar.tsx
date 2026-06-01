import { Search, MapPin, Briefcase, SlidersHorizontal, ChevronDown } from "lucide-react";

interface JobSearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
  locationKeyword: string;
  setLocationKeyword: (val: string) => void;
}

export default function JobSearchBar({
  searchKeyword,
  setSearchKeyword,
  locationKeyword,
  setLocationKeyword,
}: JobSearchBarProps) {
  return (
    <div className="w-full bg-gray-50 py-10 px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Breadcrumb & Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Find Job</h1>
          <div className="text-[14px] text-gray-500 select-none">
            <span className="hover:text-primary-500 cursor-pointer transition-colors">Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Find job</span>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="w-full bg-white border border-gray-100 rounded-xl p-2 flex flex-col md:flex-row items-center shadow-sm gap-2">
          
          <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 md:py-0">
            <Search size={22} className="text-primary-500 shrink-0" />
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Job title, Keyword..." 
              className="w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-gray-100 shrink-0" />

          <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 md:py-0">
            <MapPin size={22} className="text-primary-500 shrink-0" />
            <input 
              type="text" 
              value={locationKeyword}
              onChange={(e) => setLocationKeyword(e.target.value)}
              placeholder="Location" 
              className="w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-gray-100 shrink-0" />

          <div className="flex items-center justify-between flex-1 w-full px-3 py-2 md:py-0 cursor-pointer group">
            <div className="flex items-center gap-3">
              <Briefcase size={22} className="text-primary-500 shrink-0" />
              <span className="text-[15px] text-gray-400 select-none group-hover:text-gray-600 transition-colors">
                Select Category
              </span>
            </div>
            <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>

          <button className="flex items-center gap-2 px-4 py-3 border border-gray-100 rounded-lg text-[15px] font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all shrink-0 w-full md:w-auto justify-center">
            <SlidersHorizontal size={18} />
            <span>Advance Filter</span>
          </button>

          <button className="bg-primary-500 hover:bg-primary-600 active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3 rounded-lg transition-all shrink-0 w-full md:w-auto shadow-sm">
            Find Job
          </button>
        </div>

      </div>
    </div>
  );
}