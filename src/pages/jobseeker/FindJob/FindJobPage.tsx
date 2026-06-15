import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardPagination from '../../../components/ui/DashboardPagination';
import JobSearchBar from './components/JobSearchBar';
import FilterSortBar from './components/FilterSortBar';
import JobList from './components/JobList';
import { useFindJobs } from './hooks/useFindJobs';
import useAuth from '../../../contexts/auth/useAuth';
import { buildJobApplyPath } from '../../../utils/post-auth-redirect';

export default function FindJobPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
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
        category,
        setCategory,
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
        savedJobIds,
        totalPages,
        handleSearch,
        handlePageChange,
        handleToggleSave,
        sortBy,
        setSortBy,
    } = useFindJobs();

    const handleJobDoubleClick = (id: string) => {
        const authUser = user as { role?: string } | null;

        if (authUser && authUser.role === 'SEEKER') {
            navigate(`/jobseeker/find-job/${id}`);
        } else {
            navigate(`/job/${id}`);
        }
    };

    const handleProtectedListApplyClick = (jobId: string) => {
        if (!user) {
            toast.info('Please sign in before applying.');
        }
        navigate(buildJobApplyPath(jobId));
    };

    return (
        <div className='min-h-screen w-full bg-white pb-16 font-sans'>
            <JobSearchBar
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                locationKeyword={locationKeyword}
                setLocationKeyword={setLocationKeyword}
                category={category}
                setCategory={setCategory}
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

            <div className='mx-auto mt-8 max-w-7xl px-8'>
                {/* Truyền thêm sortBy và onSortChange vào FilterSortBar */}
                <FilterSortBar 
                    viewMode={viewMode} 
                    setViewMode={setViewMode} 
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                {loading ? (
                    <div className='flex items-center justify-center py-20'>
                        <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500' />
                    </div>
                ) : error ? (
                    <div className='py-20 text-center font-semibold text-red-500'>
                        {error}
                    </div>
                ) : (
                    <JobList
                        jobs={jobs}
                        viewMode={viewMode}
                        savedJobIds={savedJobIds}
                        onToggleSave={handleToggleSave}
                        onJobDoubleClick={handleJobDoubleClick}
                        onApplyClick={handleProtectedListApplyClick}
                    />
                )}

                <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}