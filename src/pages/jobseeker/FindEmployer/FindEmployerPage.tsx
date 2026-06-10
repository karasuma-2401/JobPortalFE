import DashboardPagination from "../../../components/ui/DashboardPagination";
import EmployerSearchBar from "./components/EmployerSearchBar";
import FilterSortBar from "./components/EmployerFilterSortBar"; 
import EmployerList from "./components/EmployerList";
import EmployerDetailPage from "./EmployerDetailPage";
import { useFindEmployers } from "./hooks/useFindEmployers";

export default function FindEmployerPage() {
  const {
    employers,
    loading,
    error,
    viewMode,
    setViewMode,
    currentPage,
    keyword,
    setKeyword,
    location,
    setLocation,
    category,
    setCategory,
    selectedEmployerId,
    setSelectedEmployerId,
    totalPages,
    totalCount,
    handleSearch,
    handlePageChange,
  } = useFindEmployers();

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
        <FilterSortBar 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          totalCount={totalCount} 
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
        ) : (
          <EmployerList 
            employers={employers} 
            viewMode={viewMode} 
            onEmployerDoubleClick={(id) => setSelectedEmployerId(id)} 
          />
        )}

        {employers?.length > 0 && (
          <div className="mt-8">
            <DashboardPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}