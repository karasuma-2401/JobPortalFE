import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobAlertItem from './JobAlertItem';
import DashboardPagination from '../../../../components/ui/DashboardPagination';
import { Skeleton } from '../../../../components/ui/Skeleton';
import { useJobAlerts } from './hooks/useJobAlerts';

export default function JobAlertPage() {
    const navigate = useNavigate();
    const {
        recentJobs,
        loading,
        error,
        totalCount,
        currentPage,
        totalPages,
        handlePageChange,
    } = useJobAlerts();

    const handleViewDetail = (id: string) => {
        navigate(`/jobseeker/job/${id}`);
    };

    if (error) {
        return (
            <div className='mt-4 rounded-xl bg-danger-50 py-20 text-center font-semibold text-danger-500'>
                {error}
            </div>
        );
    }

    return (
        <div className='space-y-8 pb-8 text-left animate-in fade-in duration-500'>
            <div className='flex items-center gap-4 pb-2'>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 shadow-sm'>
                    <Bell size={24} />
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-[20px] font-bold text-gray-900'>
                            Job Alerts
                        </h1>
                        {!loading && (
                            <span className='rounded-md bg-gray-100 px-2 py-0.5 text-[15px] font-medium text-gray-500'>
                                {totalCount}
                            </span>
                        )}
                    </div>
                    <p className='mt-1 text-sm font-medium text-gray-500'>
                        {totalCount > 0
                            ? 'New jobs posted matching your profile in the last 7 days'
                            : 'Stay tuned for new job opportunities'}
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                {loading ? (
                    <div className='flex flex-col gap-4'>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className='flex items-center justify-between rounded-xl border border-gray-100 bg-bg-white p-6'
                            >
                                <div className='flex flex-1 items-center gap-5'>
                                    <Skeleton className='h-14 w-14 shrink-0 rounded-xl' />
                                    <div className='flex-1 space-y-2'>
                                        <Skeleton className='h-5 w-1/3' />
                                        <Skeleton className='h-4 w-1/2' />
                                    </div>
                                </div>
                                <div className='flex items-center gap-5'>
                                    <Skeleton className='hidden h-8 w-24 rounded-md sm:block' />
                                    <Skeleton className='h-10 w-[130px] rounded-lg' />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : recentJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 py-24'>
                        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-white shadow-sm'>
                            <Bell size={28} className='text-primary-300' />
                        </div>
                        <h3 className='mb-2 text-lg font-bold text-gray-900'>
                            No new job alerts
                        </h3>
                        <p className='mb-6 max-w-sm text-center text-[14px] text-gray-500'>
                            There are no new jobs matching your profile in the
                            last 7 days. Check back soon or explore all
                            available jobs.
                        </p>
                        <button
                            onClick={() => navigate('/jobseeker/find-job')}
                            className='rounded-lg border border-gray-100 bg-bg-white px-6 py-2.5 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-primary-600'
                        >
                            Explore Jobs
                        </button>
                    </div>
                ) : (
                    recentJobs.map((job) => (
                        <JobAlertItem
                            key={job.id}
                            job={job}
                            onViewDetail={handleViewDetail}
                        />
                    ))
                )}
            </div>

            {!loading && recentJobs.length > 0 && (
                <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
