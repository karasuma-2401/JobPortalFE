import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardPagination from '../../../components/ui/DashboardPagination';
import { Skeleton } from '../../../components/ui/Skeleton';
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
                    <div className='mt-8 flex flex-col gap-4'>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className='flex items-center gap-6 p-6 border border-gray-100 rounded-xl bg-white'
                            >
                                {/* Logo skeleton */}
                                <Skeleton className='h-14 w-14 rounded-lg shrink-0' />

                                {/* Content skeleton */}
                                <div className='flex-1 space-y-3'>
                                    <Skeleton className='h-5 w-1/3' />
                                    <div className='flex gap-4'>
                                        <Skeleton className='h-4 w-24' />
                                        <Skeleton className='h-4 w-24' />
                                        <Skeleton className='h-4 w-24' />
                                    </div>
                                </div>

                                {/* Action skeleton */}
                                <div className='flex items-center gap-5'>
                                    <Skeleton className='h-10 w-10 rounded-lg' />
                                    <Skeleton className='h-12 w-32 rounded-lg' />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className='py-20 text-center font-semibold text-danger-500'>
                        {error}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-center'>
                        <p className='text-gray-500'>
                            No jobs found matching your criteria.
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className='mt-4 font-bold text-primary-500 hover:text-primary-600 transition-colors'
                        >
                            Reset Filters
                        </button>
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

                {!loading && jobs.length > 0 && (
                    <DashboardPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}
