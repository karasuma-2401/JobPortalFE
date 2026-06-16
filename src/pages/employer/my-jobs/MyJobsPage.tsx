import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MyJobsTable, { type JobItem } from './components/MyJobsTable';
import Pagination from '../../../components/ui/Pagination';
import CustomDropdown from '../../../components/ui/DropDown';

import { useEmployerJobs } from '../../../hooks/useEmployerJobs';
import { useJobActions } from '../../../hooks/useJobActions';
import type { JobPostResponse } from '../../../types/jobpost';

import MyJobsTableSkeleton from './components/MyJobsTableSkeleton';

const ITEMS_PER_PAGE = 6;

const filterOptions = [
    { label: 'All Jobs', value: 'ALL' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Expire', value: 'EXPIRED' },
];

export default function MyJobsPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<string>('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const { data: jobData, isLoading } = useEmployerJobs(
        '',
        currentPage,
        ITEMS_PER_PAGE
    );
    const { expireJob } = useJobActions();

    const mappedJobs: JobItem[] = useMemo(() => {
        if (!jobData?.items) return [];

        const allJobs = jobData.items.map((job: JobPostResponse) => {
            let dateInfo = job.daysRemaining || 'N/A';
            if (!job.daysRemaining && job.expiresAt) {
                const diffTime =
                    new Date(job.expiresAt).getTime() - new Date().getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                dateInfo =
                    diffDays > 0 ? `${diffDays} days remaining` : 'Expired';
            }
            let displayStatus: 'Active' | 'Expire' = 'Active';
            if (job.status === 'EXPIRED' || job.status === 'CLOSED') {
                displayStatus = 'Expire';
            }

            return {
                id: String(job.id),
                title: job.title || 'Untitled',
                type: job.employmentType
                    ? job.employmentType.replace('_', ' ')
                    : 'N/A',
                dateInfo,
                status: displayStatus,
                applications: job.applicationCount || 0,
                isFeatured: job.isFeatured,
                isHighlighted: job.isHighlighted,
            };
        });

        if (filter === 'ACTIVE') {
            return allJobs.filter((job) => job.status === 'Active');
        }
        if (filter === 'EXPIRED') {
            return allJobs.filter((job) => job.status === 'Expire');
        }

        return allJobs;
    }, [jobData, filter]);

    const totalPages = Math.ceil((jobData?.totalItems || 0) / ITEMS_PER_PAGE);

    const handleFilterChange = (val: string) => {
        setFilter(val);
    };

    const handleViewApplications = (id: string) => {
        navigate(`/employer/applications?jobId=${id}`);
    };

    const handleViewDetail = (id: string) => {
        navigate(`/employer/my-jobs/${id}`);
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
        </div>
    );
}
