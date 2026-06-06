import { useState } from "react";
import DashboardPagination from "../../../components/ui/DashboardPagination";

import JobSearchBar from "./components/JobSearchBar";
import FilterSortBar from "./components/FilterSortBar";
import JobList from "./components/JobList";

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
        />

        <DashboardPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
}