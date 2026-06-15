// import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import JobDetailHeader from './components/JobDetailHeader';
import JobQuickStats from './components/JobQuickStats';
import JobMainContent from './components/JobContent';
import JobSidebar from './components/JobSidebar';
// import PromoteJobModal from './components/PromoteJobModal';
import { useJobDetail } from '../../../hooks/useJobDetail';
import JobDetailSkeleton from './components/JobDetailSkeleton';
interface JobDetailResponse {
    id?: string | number;
    title?: string;
    description?: string;
    employmentType?: string;
    status?: string;
    educationLevel?: string;
    experience?: number;
    jobLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    createdAt?: string;
    expiresAt?: string;
    tags?: string | string[];
    location?: string;
    applicationCount?: number;
    views?: number;
}

export default function JobDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useJobDetail(id);
    const job = data as JobDetailResponse | undefined;

    // const [promoteModalData, setPromoteModalData] = useState({
    //     isOpen: false,
    //     jobId: '',
    //     jobTitle: '',
    // });

    const handleBack = () => navigate('/employer/my-jobs');

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Job link copied to clipboard!');
    };

    const handleEdit = () => {
        if (job?.id) navigate(`/employer/my-jobs/${job.id}/edit`);
    };

    const handleViewApplications = () => {
        if (job?.id) navigate(`/employer/applications?jobId=${job.id}`);
    };

    // const handlePromote = () => {
    //     if (job)
    //         setPromoteModalData({
    //             isOpen: true,
    //             jobId: String(job.id),
    //             jobTitle: job.title || '',
    //         });
    // };

    // const handleConfirmPromote = (plan: string) => {
    //     toast.success(`Successfully promoted job as ${plan.toUpperCase()}`);
    //     setPromoteModalData({ isOpen: false, jobId: '', jobTitle: '' });
    // };

    if (isLoading) {
        return <JobDetailSkeleton />;
    }

    if (isError || !job) {
        return (
            <div className='flex flex-col items-center justify-center min-h-100'>
                <p className='text-red-500 font-medium'>
                    Failed to load job details.
                </p>
                <button
                    onClick={handleBack}
                    className='mt-4 text-blue-600 hover:underline'
                >
                    Go back to My Jobs
                </button>
            </div>
        );
    }

    const skillsArray = Array.isArray(job.tags)
        ? job.tags.filter(Boolean)
        : job.tags
          ? job.tags
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
          : [];

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16'>
            <JobDetailHeader
                title={job.title || 'Untitled Job'}
                status={job.status || 'OPEN'}
                location={job.location || 'Not specified'}
                type={job.employmentType || 'Not specified'}
                onBack={handleBack}
                onShare={handleShare}
                onEdit={handleEdit}
            />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2 flex flex-col gap-8'>
                    <JobQuickStats
                        salary={
                            job.salaryMin && job.salaryMax
                                ? `$${job.salaryMin} - $${job.salaryMax}`
                                : 'Negotiable'
                        }
                        experience={
                            job.experience
                                ? `${job.experience}+ Years`
                                : 'Not specified'
                        }
                        postedDate={
                            job.createdAt
                                ? new Date(job.createdAt).toLocaleDateString()
                                : 'N/A'
                        }
                        expirationDate={
                            job.expiresAt
                                ? new Date(job.expiresAt).toLocaleDateString()
                                : 'N/A'
                        }
                    />
                    <JobMainContent
                        description={
                            job.description || 'No description available.'
                        }
                        requirements={[]}
                        benefits={[]}
                    />
                </div>

                <JobSidebar
                    applications={job.applicationCount || 0}
                    views={job.views || 0}
                    skills={skillsArray}
                    onViewApplications={handleViewApplications}
                    // onPromote={handlePromote}
                />
            </div>

            {/* <PromoteJobModal
                isOpen={promoteModalData.isOpen}
                jobTitle={promoteModalData.jobTitle}
                onClose={() =>
                    setPromoteModalData((prev) => ({ ...prev, isOpen: false }))
                }
                onConfirm={handleConfirmPromote}
            /> */}
        </div>
    );
}
