import { Briefcase, Bookmark, Bell, ArrowRight } from 'lucide-react';
import AppliedJobItem from '../AppliedJob/AppliedJobItem';
import StatCard from './components/StatCard';
import ProfileAlert from './components/ProfileAlert';
import JobTableHeader from './components/JobTableHeader';
import { useDashboardOverview } from './hooks/useDashboardOverview';
import { useNavigate } from 'react-router-dom';

export default function OverviewPage() {
    const navigate = useNavigate();
    const {
        loading,
        error,
        stats,
        recentApplied,
        isProfileCompleted,
        selectedJobId,
        setSelectedJobId,
    } = useDashboardOverview();

    if (loading) {
        return (
            <div className='flex justify-center items-center py-20'>
                <div className='w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='text-center py-20 text-red-500 font-semibold'>
                {error}
            </div>
        );
    }

    return (
        <div className='space-y-8 text-left animate-fade-in pb-8'>
            <div>
                <h1 className='text-[22px] font-bold text-gray-900'>Hello</h1>
                <p className='text-[15px] text-gray-500 mt-1'>
                    Here is your daily activities and job alerts
                </p>
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <StatCard
                    onClick={() => navigate('/jobseeker/DashBoard/applied')}
                    count={String(stats.appliedCount)}
                    label='Applied jobs'
                    variant='blue'
                    icon={<Briefcase size={26} strokeWidth={2.5} />}
                />
                <StatCard
                    onClick={() => navigate('/jobseeker/DashBoard/favorites')}
                    count={String(stats.favoriteCount)}
                    label='Favorite jobs'
                    variant='orange'
                    icon={<Bookmark size={26} strokeWidth={2.5} />}
                />
                <StatCard
                    onClick={() => navigate('/jobseeker/DashBoard/jobalerts')}
                    count={String(stats.alertCount)}
                    label='Job Alerts'
                    variant='green'
                    icon={<Bell size={26} strokeWidth={2.5} />}
                />
            </div>

            {!isProfileCompleted && <ProfileAlert />}

            <div className='space-y-5'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[18px] font-bold text-gray-900'>
                        Recently Applied
                    </h2>
                    <button
                        onClick={() => navigate('/jobseeker/DashBoard/applied')}
                        className='flex items-center gap-2 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors group'
                    >
                        View all{' '}
                        <ArrowRight
                            size={18}
                            className='group-hover:translate-x-1 transition-transform'
                        />
                    </button>
                </div>

                {recentApplied.length === 0 ? (
                    <div className='text-center py-10 bg-white border border-gray-100 rounded-xl'>
                        <p className='text-[15px] text-gray-400'>
                            You haven't applied to any jobs yet.
                        </p>
                    </div>
                ) : (
                    <>
                        <JobTableHeader />
                        <div className='flex flex-col gap-3'>
                            {recentApplied.map((job) => (
                                <AppliedJobItem
                                    key={job.id}
                                    id={job.id}
                                    logo={job.logo}
                                    role={job.role}
                                    type={job.type}
                                    jobPostId={job.jobPostId}
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
        </div>
    );
}
