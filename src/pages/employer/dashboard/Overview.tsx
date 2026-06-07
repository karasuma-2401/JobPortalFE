import { useNavigate } from 'react-router-dom';
import { Briefcase, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';
import StatCard from './components/StatCard';
import RecentJobsTable from './components/RecentJobsTable';
import { useEmployerDashboard } from '../../../hooks/useDashboard';

export default function Overview() {
    const navigate = useNavigate();
    const { data, isLoading } = useEmployerDashboard();

    const handleViewApplications = (jobId: number) => {
        navigate(`/employer/applications?jobId=${jobId}`);
    };

    const handlePromote = (jobId: number) => {
        toast.success(`Redirecting to Promote Job page for ID: ${jobId}`);
    };

    const handleViewDetail = (jobId: number) => {
        toast.info(`Viewing job details for ID: ${jobId}`);
    };

    const handleMarkExpired = (jobId: number) => {
        toast.success(`Job ID ${jobId} marked as expired!`);
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
                    title='Open Jobs'
                    count={data?.jobs?.length || 0}
                    icon={<Briefcase size={24} />}
                    bgColorClass='bg-primary-50'
                    textColorClass='text-primary-500'
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
        </div>
    );
}
