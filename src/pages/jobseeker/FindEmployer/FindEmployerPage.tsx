import { useNavigate } from 'react-router-dom';
import DashboardPagination from "../../../components/ui/DashboardPagination";
import EmployerSearchBar from "./components/EmployerSearchBar";
import FilterSortBar from "./components/EmployerFilterSortBar"; 
import EmployerList from "./components/EmployerList";
import { useFindEmployers } from "./hooks/useFindEmployers";
import useAuth from '../../../contexts/auth/useAuth'; 

export default function FindEmployerPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  
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
    totalPages,
    totalCount,
    handleSearch,
    handlePageChange,
  } = useFindEmployers();

  const handleEmployerDoubleClick = (id: string | number) => {
    const authUser = user as { role?: string } | null;

    if (authUser && authUser.role === 'SEEKER') {
      // Đã đăng nhập -> Điều hướng vào Layout của Jobseeker
      navigate(`/jobseeker/find-employers/${id}`);
    } else {
      // Chưa đăng nhập -> Giao diện công cộng của MainLayout
      navigate(`/employer-detail/${id}`);
    }
  };

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
            onEmployerDoubleClick={handleEmployerDoubleClick} 
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