import { useState } from "react";
import EmployerSearchBar from "./components/EmployerSearchBar";
import EmployerFilterSidebar from "./components/EmployerFilterSideBar";
import EmployerCard from "./components/EmployerCard";
import type { Employer } from "./components/EmployerCard";
import DashboardPagination from "../../../components/ui/DashboardPagination";
import { LayoutGrid, List } from "lucide-react";

const MOCK_EMPLOYERS: Employer[] = [
  { id: "1", name: "Dribbble", logo: "https://logo.clearbit.com/dribbble.com", location: "United States", openJobsCount: 3 },
  { id: "2", name: "Udemy", logo: "https://logo.clearbit.com/udemy.com", location: "China", openJobsCount: 3 },
  { id: "3", name: "Figma", logo: "https://logo.clearbit.com/figma.com", location: "United States", openJobsCount: 3 },
  { id: "4", name: "Google", logo: "https://logo.clearbit.com/google.com", location: "Australia", openJobsCount: 3 },
  { id: "5", name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", location: "Australia", openJobsCount: 3 },
];

export default function FindEmployerPage() {
  // Search States
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  
  // Filter States
  const [radius, setRadius] = useState(32);
  const [orgType, setOrgType] = useState("");
  
  // View & Pagination
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tìm kiếm:", { keyword, location, category });
  };

  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-16 font-sans text-gray-800">
      
      {/* Thanh Tìm Kiếm */}
      <EmployerSearchBar 
        keyword={keyword} setKeyword={setKeyword}
        location={location} setLocation={setLocation}
        category={category} setCategory={setCategory}
        onSearch={handleSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Cột trái: Bộ lọc */}
        <div className="lg:col-span-1">
          <EmployerFilterSidebar 
            radius={radius} setRadius={setRadius}
            orgType={orgType} setOrgType={setOrgType}
          />
        </div>

        {/* Cột phải: Danh sách & Phân trang */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          
          {/* Thanh Sort & View Mode (Header của danh sách) */}
          <div className="flex flex-wrap items-center justify-end gap-3 mb-2">
            <select className="border border-gray-200 text-gray-600 bg-white px-4 py-2.5 rounded-lg text-sm outline-none cursor-pointer">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
            <select className="border border-gray-200 text-gray-600 bg-white px-4 py-2.5 rounded-lg text-sm outline-none cursor-pointer">
              <option>12 per page</option>
              <option>24 per page</option>
            </select>
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-50 text-primary-500" : "text-gray-400"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-50 text-primary-500" : "text-gray-400"}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Danh sách Employers */}
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {MOCK_EMPLOYERS.map((employer) => (
              <EmployerCard key={employer.id} employer={employer} />
            ))}
          </div>

          {/* Phân trang */}
          <div className="mt-8">
            <DashboardPagination 
              currentPage={currentPage}
              totalPages={5}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}