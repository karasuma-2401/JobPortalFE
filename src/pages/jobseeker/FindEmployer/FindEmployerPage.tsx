import { useState } from "react";
import DashboardPagination from "../../../components/ui/DashboardPagination";

import EmployerSearchBar from "./components/EmployerSearchBar";
import FilterSortBar from "./components/EmployerFilterSortBar"; 
import EmployerList from "./components/EmployerList";
import EmployerDetailPage from "./EmployerDetailPage";


const EXPLORE_MOCK_EMPLOYERS = [
  { id: "1", name: "Dribbble", logo: "https://logo.clearbit.com/dribbble.com", location: "United States", openJobsCount: 3 },
  { id: "2", name: "Udemy", logo: "https://logo.clearbit.com/udemy.com", location: "China", openJobsCount: 3 },
  { id: "3", name: "Figma", logo: "https://logo.clearbit.com/figma.com", location: "United States", openJobsCount: 3 },
  { id: "4", name: "Google", logo: "https://logo.clearbit.com/google.com", location: "Australia", openJobsCount: 3 },
  { id: "5", name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", location: "Australia", openJobsCount: 3 },
];

export default function FindEmployerPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  
  const [selectedEmployerId, setSelectedEmployerId] = useState<string | null>(null);

  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tìm kiếm với điều kiện:", { keyword, location, category });
  };

  if (selectedEmployerId) {
    return (
      <div className="w-full bg-[#F8F9FA] font-sans min-h-screen pb-16 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-8 pt-6 text-left">
          <button 
            onClick={() => setSelectedEmployerId(null)}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-primary-500 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
          >
            ← Back to Employer List
          </button>
        </div>
        
        <EmployerDetailPage employerId={selectedEmployerId} /> 
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans min-h-screen pb-16">
      <EmployerSearchBar 
        keyword={keyword}
        setKeyword={setKeyword}
        location={location}
        setLocation={setLocation}
        category={category}
        setCategory={setCategory}
        onSearch={handleSearch}
      />

      <div className="max-w-7xl mx-auto px-8 mt-8">
        <FilterSortBar viewMode={viewMode} setViewMode={setViewMode} />

        <EmployerList 
          employers={EXPLORE_MOCK_EMPLOYERS} 
          viewMode={viewMode} 
          onEmployerDoubleClick={(id) => setSelectedEmployerId(id)} 
        />

        <div className="mt-8">
          <DashboardPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}