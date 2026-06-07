import { useState } from "react";
import DashboardPagination from "../../../components/ui/DashboardPagination";

import JobSearchBar from "./components/JobSearchBar";
import FilterSortBar from "./components/FilterSortBar";
import JobList from "./components/JobList";
import JobDetailPage from "./JobDetailPage";
import ApplyJobModal from "./components/ApplyJobModal"; 

const EXPLORE_MOCK_JOBS = [
  { id: "1", title: "Marketing Manager", companyName: "Stripe", type: "Remote", isFeatured: true, logo: "https://logo.clearbit.com/stripe.com", location: "New Mexico, USA", salary: "$50k-$80k/month", daysRemaining: "4 Days Remaining" },
  { id: "2", title: "Project Manager", companyName: "Shopify", type: "Full Time", isFeatured: true, logo: "https://logo.clearbit.com/shopify.com", location: "Dhaka, Bangladesh", salary: "$50k-$80k/month", daysRemaining: "4 Days Remaining" },
];

export default function FindJobPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationKeyword, setLocationKeyword] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  const [isListApplyModalOpen, setIsListApplyModalOpen] = useState(false);
  const [applyingJobTitle, setApplyingJobTitle] = useState("");

  const totalPages = 5;

  const handleToggleSave = (id: string | number) => {
    const stringId = String(id);
    setSavedJobIds(prev => 
      prev.includes(stringId) 
        ? prev.filter(item => item !== stringId) 
        : [...prev, stringId]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleListApplySubmit = (data: { resumeId: string; coverLetter: string }) => {
    console.log("Hồ sơ gửi từ danh sách:", data);
    alert(`Ứng tuyển thành công vị trí: ${applyingJobTitle}`);
  };

  const handleApplyClickFromList = (id: string) => {
    const targetJob = EXPLORE_MOCK_JOBS.find(job => job.id === id);
    if (targetJob) {
      setApplyingJobTitle(targetJob.title); 
      setIsListApplyModalOpen(true);       
    }
  };

  if (selectedJobId) {
    return (
      <div className="w-full bg-white font-sans min-h-screen pb-16 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-8 pt-6">
          <button 
            onClick={() => setSelectedJobId(null)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-500 transition-colors"
          >
            ← Back to Job List
          </button>
        </div>
        <JobDetailPage jobId={selectedJobId} /> 
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans min-h-screen pb-16">
      <JobSearchBar 
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        locationKeyword={locationKeyword}
        setLocationKeyword={setLocationKeyword}
      />

      <div className="max-w-7xl mx-auto px-8 mt-8">
        <FilterSortBar viewMode={viewMode} setViewMode={setViewMode} />

        <JobList 
          jobs={EXPLORE_MOCK_JOBS} 
          viewMode={viewMode} 
          savedJobIds={savedJobIds} 
          onToggleSave={handleToggleSave} 
          onJobDoubleClick={(id) => setSelectedJobId(id)} 
          onApplyClick={handleApplyClickFromList}
        />

        <DashboardPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ApplyJobModal 
        isOpen={isListApplyModalOpen}
        onClose={() => setIsListApplyModalOpen(false)}
        jobTitle={applyingJobTitle}
        onSubmit={handleListApplySubmit}
      />
    </div>
  );
}