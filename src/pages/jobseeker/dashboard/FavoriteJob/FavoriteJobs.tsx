import { useState } from 'react';
import { toast } from 'sonner';
import FavoriteJobItem from './FavoriteJobItem';
import DashboardPagination from '../../../../components/ui/DashboardPagination';
import ApplyJobModal from '../../FindJob/components/ApplyJobModal';
import { Skeleton } from '../../../../components/ui/Skeleton';
import { useFavoriteJobs } from './hooks/useFavoriteJobs';
import { useNavigate } from 'react-router-dom';

export default function FavoriteJobsPage() {
    const navigate = useNavigate();
    const {
        favoriteJobs,
        loading,
        error,
        totalCount,
        currentPage,
        selectedJobId,
        setSelectedJobId,
        totalPages,
        handlePageChange,
        handleRemoveFavorite,
        handleApplyJob,
    } = useFavoriteJobs();

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyJobTitle, setApplyJobTitle] = useState('');

    const handleApplyClick = (id: string) => {
        const job = favoriteJobs.find((j) => j.id === id);
        if (job) {
            setApplyJobId(job.id);
            setApplyJobTitle(job.role);
            setIsApplyModalOpen(true);
        }
    };

    const handleApplySubmit = async (data: {
        resumeId: string;
        coverLetter: string;
    }) => {
        try {
            await handleApplyJob(applyJobId, data.resumeId, data.coverLetter);
            setIsApplyModalOpen(false);
            toast.success(`Successfully applied for: ${applyJobTitle} 🎉`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`Application failed: ${err.message}`);
            } else {
                toast.error('An unknown error occurred while applying.');
            }
        }
    };

    if (error) {
        return (
            <div className='text-center py-20 text-red-500 font-semibold bg-red-50 rounded-xl mt-4'>
                {error}
            </div>
        );
    }

    return (
        <div className='space-y-8 text-left animate-in fade-in duration-500 pb-8'>
            <div className='flex items-center gap-2 pb-2'>
                <h1 className='text-[20px] font-bold text-gray-900'>
                    Favorite Jobs
                </h1>
                {!loading && (
                    <span className='text-[15px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md'>
                        {totalCount}
                    </span>
                )}
            </div>

            <div className='flex flex-col gap-4'>
                {loading ? (
                    <div className='flex flex-col gap-4'>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className='flex items-center justify-between p-6 border border-gray-100 rounded-xl bg-white'
                            >
                                <div className='flex items-center gap-6 flex-1'>
                                    <Skeleton className='w-14 h-14 rounded-xl shrink-0' />
                                    <div className='space-y-2 flex-1'>
                                        <Skeleton className='h-5 w-1/3' />
                                        <Skeleton className='h-4 w-1/2' />
                                    </div>
                                </div>
                                <div className='flex items-center gap-5'>
                                    <Skeleton className='w-8 h-8 rounded-full' />
                                    <Skeleton className='w-[150px] h-10 rounded-lg' />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : favoriteJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-24 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl'>
                        <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4'>
                            <i className='fa-regular fa-bookmark text-2xl text-blue-400'></i>
                        </div>
                        <h3 className='text-lg font-bold text-gray-900 mb-2'>
                            No favorite jobs yet
                        </h3>
                        <p className='text-[14px] text-gray-500 max-w-sm text-center mb-6'>
                            You haven't bookmarked any jobs. Browse our job
                            board and save the ones you like to apply later.
                        </p>
                        <button
                            onClick={() => navigate('/jobseeker/find-job')}
                            className='px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors shadow-sm'
                        >
                            Browse Jobs
                        </button>
                    </div>
                ) : (
                    favoriteJobs.map((job) => (
                        <FavoriteJobItem
                            key={job.id}
                            id={job.id}
                            logo={job.logo}
                            role={job.role}
                            type={job.type}
                            location={job.location}
                            salary={job.salary}
                            timeStatus={job.timeStatus}
                            isExpired={job.isExpired}
                            isSelected={selectedJobId === job.id}
                            onSelect={() => setSelectedJobId(job.id)}
                            onBookmarkClick={handleRemoveFavorite}
                            onApplyClick={handleApplyClick}
                        />
                    ))
                )}
            </div>

            {!loading && favoriteJobs.length > 0 && (
                <DashboardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            <ApplyJobModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                jobTitle={applyJobTitle}
                onSubmit={handleApplySubmit}
            />
        </div>
    );
}
