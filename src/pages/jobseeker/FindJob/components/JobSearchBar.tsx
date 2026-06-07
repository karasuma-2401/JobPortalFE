import { useState } from "react";
import { Search, MapPin, Briefcase, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import AdvanceFilterPanel from "./AdvanceFilterPanel";

interface JobSearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
  locationKeyword: string;
  setLocationKeyword: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;

  // Advance Filter Props
  experience: string;
  setExperience: (val: string) => void;
  salaryRange: string;
  setSalaryRange: (val: string) => void;
  jobTypes: string[];
  setJobTypes: (val: string[]) => void;
  education: string[];
  setEducation: (val: string[]) => void;
  jobLevel: string;
  setJobLevel: (val: string) => void;
  handleResetFilters: () => void;
}

export default function JobSearchBar({
  searchKeyword,
  setSearchKeyword,
  locationKeyword,
  setLocationKeyword,
  onSearch,
  experience,
  setExperience,
  salaryRange,
  setSalaryRange,
  jobTypes,
  setJobTypes,
  education,
  setEducation,
  jobLevel,
  setJobLevel,
  handleResetFilters,
}: JobSearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full bg-[#F1F2F4] py-10 px-8 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <form onSubmit={onSearch} className="w-full bg-white border border-gray-200 rounded-xl p-2 flex flex-col md:flex-row items-center shadow-sm gap-2">
          
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

          <div className="hidden md:block w-[1px] h-8 bg-gray-200 shrink-0" />

                    <div className='flex items-center gap-3 flex-1 w-full px-3 py-2 md:py-0'>
                        <MapPin
                            size={22}
                            className='text-primary-500 shrink-0'
                        />
                        <input
                            type='text'
                            value={locationKeyword}
                            onChange={(e) => setLocationKeyword(e.target.value)}
                            placeholder='Location'
                            className='w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent'
                        />
                    </div>

          <div className="hidden md:block w-[1px] h-8 bg-gray-200 shrink-0" />

                    <div className='flex items-center justify-between flex-1 w-full px-3 py-2 md:py-0 cursor-pointer group'>
                        <div className='flex items-center gap-3'>
                            <Briefcase
                                size={22}
                                className='text-primary-500 shrink-0'
                            />
                            <span className='text-[15px] text-gray-400 select-none group-hover:text-gray-600 transition-colors'>
                                Select Category
                            </span>
                        </div>
                        <ChevronDown
                            size={18}
                            className='text-gray-400 group-hover:text-gray-600 transition-colors'
                        />
                    </div>

          <button 
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg text-[15px] font-medium transition-all shrink-0 w-full md:w-auto justify-center ${
              isFilterOpen 
                ? "border-primary-500 text-primary-500 bg-primary-50/50" 
                : "border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
            }`}
          >
            <SlidersHorizontal size={18} />
            <span>Advance Filter</span>
            {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <button type="submit" className="bg-primary-500 hover:bg-primary-600 active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3 rounded-lg transition-all shrink-0 w-full md:w-auto shadow-sm">
            Find Job
          </button>
        </form>

        {isFilterOpen && (
          <AdvanceFilterPanel 
            experience={experience}
            setExperience={setExperience}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            jobTypes={jobTypes}
            setJobTypes={setJobTypes}
            education={education}
            setEducation={setEducation}
            jobLevel={jobLevel}
            setJobLevel={setJobLevel}
            handleResetFilters={handleResetFilters}
          />
        )}

      </div>
    </div>
  );
}
