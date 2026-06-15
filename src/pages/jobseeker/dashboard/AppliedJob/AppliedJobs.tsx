import AppliedJobItem from './AppliedJobItem';
import DashboardPagination from '../../../../components/ui/DashboardPagination';
import { Skeleton } from '../../../../components/ui/Skeleton';
import { useAppliedJobs } from './hooks/useAppliedJobs';

export default function AppliedJobsPage() {
    const {
        appliedJobs,
        loading,
        error,
        totalCount,
        currentPage,
        selectedJobId,
        setSelectedJobId,
        totalPages,
        handlePageChange,
    } = useAppliedJobs();

    if (error) {
        return (
            <div className='text-center py-20 text-red-500 font-semibold bg-red-50 rounded-xl mt-4'>
                {error}
            </div>
        );
    }

    return (
        <div className='space-y-6 text-left animate-in fade-in duration-500 pb-8'>
            <div className='flex items-center gap-2 pb-2'>
                <h1 className='text-[20px] font-bold text-gray-900'>
                    Applied Jobs
                </h1>
                {!loading && (
                    <span className='text-[15px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md'>
                        {totalCount}
                    </span>
                )}
            </div>

            <div className='space-y-4'>
                {loading ? (
                    <div className='flex flex-col gap-3 mt-4'>
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className='flex items-center px-6 py-5 border border-gray-100 rounded-xl bg-white'
                            >
                                <div className='flex items-center gap-5 flex-1'>
                                    <Skeleton className='w-14 h-14 rounded-xl shrink-0' />
                                    <div className='space-y-2 flex-1'>
                                        <Skeleton className='h-5 w-1/3' />
                                        <Skeleton className='h-4 w-1/4' />
                                    </div>
                                </div>
                                <Skeleton className='w-[160px] h-4 hidden md:block' />
                                <Skeleton className='w-[140px] h-6 rounded-full hidden md:block' />
                                <div className='w-[140px] flex justify-end'>
                                    <Skeleton className='w-full h-9 rounded-lg' />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : appliedJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-24 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl'>
                        <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4'>
                            <i className='fa-solid fa-briefcase text-2xl text-gray-300'></i>
                        </div>
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                            No applications yet
                        </h3>
                        <p className='text-[14px] text-gray-500 max-w-sm text-center'>
                            You haven't applied to any jobs yet. Start exploring
                            and find your dream job today!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Headers */}
                        <div className='flex items-center px-6 py-3 bg-gray-50/80 rounded-lg text-xs font-bold text-gray-500 tracking-wider border border-gray-100'>
                            <div className='flex-1'>JOBS DETAILS</div>
                            <div className='w-[160px]'>DATE APPLIED</div>
                            <div className='w-[140px]'>STATUS</div>
                            <div className='w-[140px] text-center'>ACTION</div>
                        </div>

                        {/* List */}
                        <div className='flex flex-col gap-3'>
                            {appliedJobs.map((job) => (
                                <AppliedJobItem
                                    key={job.id}
                                    jobPostId={job.jobPostId}
                                    id={job.id}
                                    logo={job.logo}
                                    role={job.role}
                                    type={job.type}
                                    location={job.location}
                                    salary={job.salary}
                                    dateApplied={job.appliedAt}
                                    status={job.status}
                                    isSelected={selectedJobId === job.id}
                                    onSelect={() => setSelectedJobId(job.id)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {!loading && appliedJobs.length > 0 && (
                <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
