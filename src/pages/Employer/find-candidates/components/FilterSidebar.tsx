import { Search, Filter } from "lucide-react";
import CustomDropdown from "../../../../components/ui/DropDown";
import { JOB_CATEGORIES, EXPERIENCE_LEVELS } from "../mockData";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedExperience: string;
  setSelectedExperience: (val: string) => void;
}

export default function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedExperience,
  setSelectedExperience,
}: FilterSidebarProps) {
  const experienceOptions = EXPERIENCE_LEVELS.map((exp) => ({
    label: exp,
    value: exp,
  }));

  return (
    <div className="w-full lg:w-80 shrink-0 relative z-100">
      <div className="z-50 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <Filter size={20} className="text-gray-900" />
          <h2 className="text-lg font-bold text-gray-900">Advanced Filter</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Search Keywords
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Name, role, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category
            </label>
            <div className="space-y-2">
              {JOB_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Experience Level
            </label>
            <CustomDropdown
              options={experienceOptions}
              value={selectedExperience}
              onChange={(val) => setSelectedExperience(val as string)}
              dropUp={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
