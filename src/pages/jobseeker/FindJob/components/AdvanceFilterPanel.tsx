

interface AdvanceFilterPanelProps {
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

export default function AdvanceFilterPanel({
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
}: AdvanceFilterPanelProps) {
  const handleCheckboxChange = (value: string, state: string[], setState: (val: string[]) => void) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl mt-3 shadow-md overflow-hidden transition-all duration-300 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100 p-6 gap-y-6 md:gap-y-0">

        <div className="flex flex-col gap-3.5 pr-4">
          <h4 className="text-[15px] font-semibold text-gray-800">Experience</h4>
          <div className="flex flex-col gap-3">
            {["Freshers", "1 - 2 Years", "2 - 4 Years", "4 - 6 Years", "6 - 8 Years", "8 - 10 Years", "10 - 15 Years", "15+ Years"].map((exp) => (
              <label key={exp} className="flex items-center gap-3 cursor-pointer group text-[14px] text-gray-600 select-none">
                <input
                  type="radio"
                  name="experience"
                  checked={experience === exp}
                  onChange={() => setExperience(exp)}
                  className="w-4 h-4 accent-primary-500 cursor-pointer text-primary-500"
                />
                <span className="group-hover:text-gray-900 transition-colors">{exp}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-0 md:px-4">
          <h4 className="text-[15px] font-semibold text-gray-800">Salary</h4>
          <div className="flex flex-col gap-3">
            {["$50 - $1000", "$1000 - $2000", "$3000 - $4000", "$4000 - $6000", "$6000 - $8000", "$8000 - $10000", "$10000 - $15000", "$15000+"].map((sal) => (
              <label key={sal} className="flex items-center gap-3 cursor-pointer group text-[14px] text-gray-600 select-none">
                <input
                  type="radio"
                  name="salary"
                  checked={salaryRange === sal}
                  onChange={() => setSalaryRange(sal)}
                  className="w-4 h-4 accent-primary-500 cursor-pointer"
                />
                <span className="group-hover:text-gray-900 transition-colors">{sal}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-0 md:px-4">
          <h4 className="text-[15px] font-semibold text-gray-800">Job Type</h4>
          <div className="flex flex-col gap-3">
            {["All", "Full Time", "Part Time", "Internship", "Remote", "Temporary", "Contract Base"].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group text-[14px] text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={jobTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type, jobTypes, setJobTypes)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 accent-primary-500 cursor-pointer"
                />
                <span className="group-hover:text-gray-900 transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-0 md:px-4">
          <h4 className="text-[15px] font-semibold text-gray-800">Education</h4>
          <div className="flex flex-col gap-3">
            {["All", "High School", "Intermediate", "Graduation", "Master Degree", "Bachelor Degree"].map((edu) => (
              <label key={edu} className="flex items-center gap-3 cursor-pointer group text-[14px] text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={education.includes(edu)}
                  onChange={() => handleCheckboxChange(edu, education, setEducation)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 accent-primary-500 cursor-pointer"
                />
                <span className="group-hover:text-gray-900 transition-colors">{edu}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 pl-0 md:pl-4">
          <h4 className="text-[15px] font-semibold text-gray-800">Job Level</h4>
          <div className="flex flex-col gap-3">
            {["Entry Level", "Mid Level", "Expert Level"].map((lvl) => (
              <label key={lvl} className="flex items-center gap-3 cursor-pointer group text-[14px] text-gray-600 select-none">
                <input
                  type="radio"
                  name="jobLevel"
                  checked={jobLevel === lvl}
                  onChange={() => setJobLevel(lvl)}
                  className="w-4 h-4 accent-primary-500 cursor-pointer"
                />
                <span className="group-hover:text-gray-900 transition-colors">{lvl}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
      <div className="flex justify-end bg-gray-50/50 px-6 py-3 border-t border-gray-100">
        <button 
          type="button"
          onClick={handleResetFilters}
          className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}