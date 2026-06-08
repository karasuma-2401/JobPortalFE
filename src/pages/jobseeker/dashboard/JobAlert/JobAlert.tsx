import JobAlertItem from './JobAlertItem';
import DashboardPagination from '../../../../components/ui/DashboardPagination';
import { useJobAlerts } from './hooks/useJobAlerts';

export default function JobAlertPage() {
    const {
        jobAlerts,
        loading,
        error,
        totalCount,
        currentPage,
        selectedJobId,
        setSelectedJobId,
        totalPages,
        handlePageChange,
    } = useJobAlerts();

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
            <div className='border-b border-gray-50 pb-2'>
                <div className='flex items-end gap-3'>
                    <h1 className='text-xl font-bold text-gray-900'>Job Alerts</h1>
                    <span className='mb-0.5 text-sm font-medium text-gray-400'>
                        ({totalCount} alerts)
                    </span>
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                    These are your saved seeker alert rules from the backend.
                </p>
            </div>

            <div className='flex flex-col gap-5'>
                {jobAlerts.length === 0 ? (
                    <div className='rounded-xl border border-gray-100 bg-white py-10 text-center'>
                        <p className='text-[15px] text-gray-400'>
                            No job alerts found.
                        </p>
                    </div>
                ) : (
                    jobAlerts.map((jobAlert) => (
                        <JobAlertItem
                            key={jobAlert.id}
                            id={jobAlert.id}
                            keyword={jobAlert.keyword}
                            location={jobAlert.location}
                            category={jobAlert.category}
                            createdAt={jobAlert.createdAt}
                            isSelected={selectedJobId === jobAlert.id}
                            onSelect={() =>
                                setSelectedJobId(
                                    jobAlert.id === selectedJobId ? null : jobAlert.id
                                )
                            }
                        />
                    ))
                )}
            </div>

            {jobAlerts.length > 0 && (
                <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
