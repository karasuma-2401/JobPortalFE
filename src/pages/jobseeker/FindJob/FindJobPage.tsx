import DashboardPagination from "../../../components/ui/DashboardPagination";

import JobSearchBar from "./components/JobSearchBar";
import FilterSortBar from "./components/FilterSortBar";
import JobList from "./components/JobList";
import JobDetailPage from "./JobDetailPage";
import ApplyJobModal from "./components/ApplyJobModal"; 
import { useFindJobs } from "./hooks/useFindJobs";

export default function FindJobPage() {
  const {
    jobs,
    loading,
    error,
    viewMode,
    setViewMode,
    currentPage,
    searchKeyword,
    setSearchKeyword,
    locationKeyword,
    setLocationKeyword,
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
    selectedJobId,
    setSelectedJobId,
    savedJobIds,
    isListApplyModalOpen,
    setIsListApplyModalOpen,
    applyingJobTitle,
    totalPages,
    handleSearch,
    handlePageChange,
    handleToggleSave,
    handleApplyClickFromList,
    handleListApplySubmit,
  } = useFindJobs();

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
        onSearch={handleSearch}
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

      <div className="max-w-7xl mx-auto px-8 mt-8">
        <FilterSortBar viewMode={viewMode} setViewMode={setViewMode} />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
        ) : (
          <JobList 
            jobs={jobs} 
            viewMode={viewMode} 
            savedJobIds={savedJobIds} 
            onToggleSave={handleToggleSave} 
            onJobDoubleClick={(id) => setSelectedJobId(id)} 
            onApplyClick={handleApplyClickFromList}
          />
        )}

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
