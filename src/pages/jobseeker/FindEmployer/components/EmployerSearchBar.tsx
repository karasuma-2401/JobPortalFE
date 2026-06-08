import { Search, MapPin, Layers, ChevronDown } from "lucide-react";

interface EmployerSearchBarProps {
  keyword: string;
  setKeyword: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export default function EmployerSearchBar({
  keyword, setKeyword, location, setLocation, category, setCategory, onSearch
}: EmployerSearchBarProps) {
  return (
    <div className="w-full bg-[#F1F2F4] py-10 px-8 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <form onSubmit={onSearch} className="w-full bg-white border border-gray-200 rounded-xl p-2 flex flex-col md:flex-row items-center shadow-sm gap-2">
          
          <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 md:py-0">
            <Search size={22} className="text-primary-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Employer name, Keyword..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-gray-200 shrink-0" />

          <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 md:py-0">
            <MapPin size={22} className="text-primary-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-gray-200 shrink-0" />

          <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 md:py-0 relative group">
            <Layers size={22} className="text-primary-500 shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full outline-none text-[15px] text-gray-700 bg-transparent appearance-none pr-8 cursor-pointer relative z-10"
            >
              <option value="">Select Category</option>
              <option value="tech">Information Technology</option>
              <option value="design">Design & Creative</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors z-0">
              <ChevronDown size={18} />
            </div>
          </div>

          <button 
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3 rounded-lg transition-all shrink-0 w-full md:w-auto shadow-sm"
          >
            Find Employer
          </button>
          
        </form>
      </div>
    </div>
  );
}