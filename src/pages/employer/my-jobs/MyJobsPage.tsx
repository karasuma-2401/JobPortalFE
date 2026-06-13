import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MyJobsTable, { type JobItem } from './components/MyJobsTable';
import Pagination from '../../../components/ui/Pagination';
import PromoteJobModal from './components/PromoteJobModal';
import CustomDropdown from '../../../components/ui/DropDown';

import { useEmployerJobs } from '../../../hooks/useEmployerJobs';
import { useJobActions } from '../../../hooks/useJobActions';
import type { JobPostResponse } from '../../../types/jobpost';

import MyJobsTableSkeleton from './components/MyJobsTableSkeleton';
const ITEMS_PER_PAGE = 6;

const filterOptions = [
    { label: 'All Jobs', value: 'All Jobs' },
    { label: 'Active', value: 'Active' },
    { label: 'Expire', value: 'Expire' },
];

export default function MyJobsPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<string>('All Jobs');
    const [currentPage, setCurrentPage] = useState(1);

    const [promoteModalData, setPromoteModalData] = useState<{
        isOpen: boolean;
        jobId: string;
        jobTitle: string;
    }>({
        isOpen: false,
        jobId: '',
        jobTitle: '',
    });
    const { data: jobData, isLoading } = useEmployerJobs(
        filter,
        currentPage,
        ITEMS_PER_PAGE
    );
    const { promoteJob, expireJob } = useJobActions();

    const mappedJobs: JobItem[] = useMemo(() => {
        if (!jobData?.items) return [];
        return jobData.items.map((job: JobPostResponse) => {
            let dateInfo = 'N/A';
            if (job.expiresAt) {
                const diffTime =
                    new Date(job.expiresAt).getTime() - new Date().getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                dateInfo =
                    diffDays > 0 ? `${diffDays} days remaining` : 'Expired';
            }

            return {
                id: String(job.id),
                title: job.title || 'Untitled',
                type: job.employmentType || 'N/A',
                dateInfo,
                status: job.status === 'EXPIRED' ? 'Expire' : 'Active',
                applications: job.applicationCount || 0,
                isFeatured: job.isFeatured,
                isHighlighted: job.isHighlighted,
            };
        });
    }, [jobData]);

    const totalPages = Math.ceil((jobData?.totalItems || 0) / ITEMS_PER_PAGE);

    const handleFilterChange = (val: string) => {
        setFilter(val);
        setCurrentPage(1);
    };

    const handleViewApplications = (id: string) => {
        navigate(`/employer/applications?jobId=${id}`);
    };

    const handleViewDetail = (id: string) => {
        navigate(`/employer/my-jobs/${id}`);
    };

    const handlePromoteClick = (id: string) => {
        const job = mappedJobs.find((j) => j.id === id);
        if (job) {
            setPromoteModalData({
                isOpen: true,
                jobId: job.id,
                jobTitle: job.title,
            });
        }
    };

    const handleConfirmPromote = (plan: string) => {
        promoteJob({
            id: promoteModalData.jobId,
            plan: plan as 'featured' | 'highlight',
        });
        setPromoteModalData((prev) => ({ ...prev, isOpen: false }));
    };
    const handleMarkExpired = (id: string) => {
        expireJob(id);
    };

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-xl font-bold text-gray-900'>
                    My Jobs{' '}
                    <span className='text-gray-400 font-medium'>
                        ({jobData?.totalItems || 0})
                    </span>
                </h1>
                <div className='flex items-center gap-3'>
                    <span className='text-sm text-gray-500 font-medium'>
                        Job status
                    </span>
                    <div className='w-36'>
                        <CustomDropdown
                            options={filterOptions}
                            value={filter}
                            onChange={handleFilterChange}
                            className='w-full'
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <MyJobsTableSkeleton />
            ) : (
                <>
                    <MyJobsTable
                        jobs={mappedJobs}
                        onViewApplications={handleViewApplications}
                        onPromote={handlePromoteClick}
                        onViewDetail={handleViewDetail}
                        onMarkExpired={handleMarkExpired}
                    />

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}

            <PromoteJobModal
                isOpen={promoteModalData.isOpen}
                jobTitle={promoteModalData.jobTitle}
                onClose={() =>
                    setPromoteModalData((prev) => ({ ...prev, isOpen: false }))
                }
                onConfirm={handleConfirmPromote}
            />
        </div>
    );
}
