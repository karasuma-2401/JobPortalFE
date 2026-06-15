import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobAlertItem from './JobAlertItem';
import DashboardPagination from '../../../../components/ui/DashboardPagination';
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

    if (loading) {
        return (
            <div className='flex justify-center py-20'>
                <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='py-20 text-center font-semibold text-red-500'>{error}</div>
        );
    }

    return (
        <div className='space-y-8 pb-8 text-left animate-fade-in'>
            {/* Header */}
            <div className='border-b border-gray-50 pb-2'>
                <div className='flex items-center gap-3'>
                    <div className='rounded-full bg-blue-50 p-2 text-primary-500'>
                        <Bell size={18} />
                    </div>
                    <div>
                        <h1 className='text-xl font-bold text-gray-900'>Job Alerts</h1>
                        <p className='mt-0.5 text-sm text-gray-500'>
                            {totalCount > 0
                                ? `${totalCount} new jobs posted in the last 7 days`
                                : 'No new jobs in the last 7 days'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Job List */}
            <div className='flex flex-col gap-4'>
                {recentJobs.length === 0 ? (
                    <div className='rounded-xl border border-gray-100 bg-white py-16 text-center'>
                        <Bell size={36} className='mx-auto mb-3 text-gray-200' />
                        <p className='text-[15px] font-medium text-gray-400'>
                            No new jobs this week. Check back soon!
                        </p>
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

            {recentJobs.length > 0 && (
                <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
