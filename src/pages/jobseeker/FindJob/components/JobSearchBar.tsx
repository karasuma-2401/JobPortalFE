import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Briefcase, SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react";
import AdvanceFilterPanel from "./AdvanceFilterPanel";
import { useIndustries } from "../../../../hooks/useIndustries";

interface JobSearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
  locationKeyword: string;
  setLocationKeyword: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
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
  category,
  setCategory,
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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { data: industries } = useIndustries();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

                    <div className='relative flex-1 w-full' ref={categoryRef}>
                        <div
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className='flex items-center justify-between px-3 py-2 md:py-0 cursor-pointer group h-full'
                        >
                            <div className='flex items-center gap-3 w-full min-w-0'>
                                <Briefcase
                                    size={22}
                                    className='text-primary-500 shrink-0'
                                />
                                <span className={`text-[15px] truncate select-none transition-colors ${category ? 'text-gray-900 font-medium' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {category || 'Select Category'}
                                </span>
                            </div>
                            <div className='flex items-center gap-1 shrink-0'>
                                {category && (
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCategory('');
                                        }}
                                        className='p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600'
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                                {isCategoryOpen ? (
                                    <ChevronUp
                                        size={18}
                                        className='text-gray-400 group-hover:text-gray-600 transition-colors'
                                    />
                                ) : (
                                    <ChevronDown
                                        size={18}
                                        className='text-gray-400 group-hover:text-gray-600 transition-colors'
                                    />
                                )}
                            </div>
                        </div>

                        {isCategoryOpen && (
                            <div className='absolute left-0 right-0 mt-2 z-50 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 animate-in fade-in slide-in-from-top-2 duration-200'>
                                <div
                                    onClick={() => {
                                        setCategory('');
                                        setIsCategoryOpen(false);
                                    }}
                                    className={`px-4 py-2.5 text-[15px] cursor-pointer hover:bg-gray-50 transition-colors text-left ${
                                        !category ? 'text-primary-500 font-bold bg-primary-50/20' : 'text-gray-700'
                                    }`}
                                >
                                    All Categories
                                </div>
                                {industries?.map((ind) => (
                                    <div
                                        key={ind.id}
                                        onClick={() => {
                                            setCategory(ind.name);
                                            setIsCategoryOpen(false);
                                        }}
                                        className={`px-4 py-2.5 text-[15px] cursor-pointer hover:bg-gray-50 transition-colors text-left truncate ${
                                            category === ind.name ? 'text-primary-500 font-bold bg-primary-50/20' : 'text-gray-700'
                                        }`}
                                    >
                                        {ind.name}
                                    </div>
                                ))}
                            </div>
                        )}
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
