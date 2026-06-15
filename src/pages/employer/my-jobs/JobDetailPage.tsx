// import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import JobDetailHeader from './components/JobDetailHeader';
import JobQuickStats from './components/JobQuickStats';
import JobMainContent from './components/JobContent';
import JobSidebar from './components/JobSidebar';
import { useJobForEdit } from '../../../hooks/useJobForEdit';
import { useApplicationCount } from '../../../hooks/useApplications';
import JobDetailSkeleton from './components/JobDetailSkeleton';

export default function JobDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: job, isLoading, isError } = useJobForEdit(id);
    const { data: applicationCount = 0 } = useApplicationCount(id);

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

    // Parse tags — backend trả về string[] từ for-edit endpoint
    const skillsArray = Array.isArray(job.tags)
        ? (job.tags as string[]).filter(Boolean)
        : typeof job.tags === 'string'
          ? (job.tags as string)
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
          : [];

    // Parse requirements — backend trả về string, hiển thị theo dòng
    const requirementsArray =
        typeof job.requirements === 'string' && job.requirements
            ? job.requirements
                  .split('\n')
                  .map((r) => r.trim())
                  .filter(Boolean)
            : [];

    // Format salary
    const salaryDisplay =
        job.salaryMin != null && job.salaryMax != null
            ? `$${Number(job.salaryMin).toLocaleString()} - $${Number(job.salaryMax).toLocaleString()}`
            : 'Negotiable';

    // Format expiration date
    const expirationDisplay = job.expiresAt
        ? new Date(job.expiresAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : 'N/A';

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
                        salary={salaryDisplay}
                        experience={
                            job.experience != null
                                ? `${job.experience}+ Years`
                                : 'Not specified'
                        }
                        postedDate='—'
                        expirationDate={expirationDisplay}
                    />
                    <JobMainContent
                        description={
                            job.description || 'No description available.'
                        }
                        requirements={requirementsArray}
                    />
                </div>

                <JobSidebar
                    applications={applicationCount}
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
