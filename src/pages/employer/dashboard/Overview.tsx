import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, BookmarkCheck, Users } from 'lucide-react';
import StatCard from './components/StatCard';
import RecentJobsTable from './components/RecentJobsTable';

import { useEmployerDashboard } from '../../../hooks/useDashboard';
import { useJobActions } from '../../../hooks/useJobActions';
import PromoteJobModal from '../my-jobs/components/PromoteJobModal';

export default function Overview() {
    const navigate = useNavigate();
    const { data, isLoading } = useEmployerDashboard();
    const { promoteJob, expireJob } = useJobActions();
    const [promoteModalData, setPromoteModalData] = useState<{
        isOpen: boolean;
        jobId: number | string;
        jobTitle: string;
    }>({
        isOpen: false,
        jobId: '',
        jobTitle: '',
    });

    const handleViewApplications = (jobId: number) => {
        navigate(`/employer/applications?jobId=${jobId}`);
    };

    const handleViewDetail = (jobId: number) => {
        navigate(`/employer/my-jobs/${jobId}`);
    };

    const handlePromote = (jobId: number) => {
        const job = data?.jobs?.find((j) => j.id === jobId);
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
            id: String(promoteModalData.jobId),
            plan: plan as 'featured' | 'highlight',
        });
        setPromoteModalData((prev) => ({ ...prev, isOpen: false }));
    };

    const handleMarkExpired = (jobId: number) => {
        const confirm = window.confirm(
            'Are you sure you want to mark this job as expired?'
        );
        if (confirm) {
            expireJob(String(jobId));
        }
    };

    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center min-h-100'>
                <div className='w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin'></div>
            </div>
        );
    }

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-10'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-gray-900 mb-1'>
                    Dashboard
                </h1>
                <p className='text-sm text-gray-500'>
                    Overview of your daily activities
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <StatCard
                    title='Total Jobs'
                    count={data?.statistics?.totalJobs || 0}
                    icon={<Briefcase size={24} />}
                    bgColorClass='bg-primary-50'
                    textColorClass='text-primary-500'
                />
                <StatCard
                    title='Total Applicants'
                    count={data?.statistics?.totalApplicants || 0}
                    icon={<Users size={24} />}
                    bgColorClass='bg-blue-50'
                    textColorClass='text-blue-600'
                />
                <StatCard
                    title='Saved Candidates'
                    count={data?.savedCandidates || 0}
                    icon={<BookmarkCheck size={24} />}
                    bgColorClass='bg-warning-50'
                    textColorClass='text-warning-500'
                />
            </div>

            <RecentJobsTable
                jobs={data?.jobs || []}
                onViewApplications={handleViewApplications}
                onPromote={handlePromote}
                onViewDetail={handleViewDetail}
                onMarkExpired={handleMarkExpired}
            />

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
