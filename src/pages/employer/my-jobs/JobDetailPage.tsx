import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import JobDetailHeader from './components/JobDetailHeader';
import JobQuickStats from './components/JobQuickStats';
import JobMainContent from './components/JobContent';
import JobSidebar from './components/JobSidebar';
import PromoteJobModal from './components/PromoteJobModal';

export default function JobDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job] = useState({
        id: id || '1',
        title: 'UI/UX Designer',
        status: 'Active',
        type: 'Full Time',
        location: 'Ho Chi Minh City, Vietnam',
        salary: '$1,200 - $2,500',
        experience: '2 - 4 Years',
        postedDate: 'Oct 24, 2023',
        expirationDate: 'Nov 24, 2023',
        applications: 798,
        views: 2451,
        description: `We are looking for an experienced and creative UI/UX Designer to join our team. As a UI/UX Designer, you will be responsible for delivering the best online user experience, which makes your role extremely important for our success and ensuring customer satisfaction and loyalty.`,
        requirements: [
            'Minimum of 2 years of experience as a UI/UX Designer or similar role.',
            'UI design portfolio.',
            'Excellent logical and analytical skills.',
            'Experience with HTML5 & CSS3.',
            'Familiarity with interaction design and information architecture.',
        ],
        benefits: [
            'Competitive salary and performance review.',
            'MacBook Pro provided.',
            '15 days of annual leave.',
            'Premium healthcare insurance.',
        ],
        skills: [
            'Figma',
            'Prototyping',
            'Wireframing',
            'User Research',
            'UI Design',
        ],
    });

    const [promoteModalData, setPromoteModalData] = useState({
        isOpen: false,
        jobId: '',
        jobTitle: '',
    });

    const handleBack = () => {
        navigate('/employer/my-jobs');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Job link copied to clipboard!');
    };

    const handleEdit = () => {
        navigate(`/employer/my-jobs/${job.id}/edit`);
    };

    const handleViewApplications = () => {
        navigate(`/employer/applications?jobId=${job.id}`);
    };

    const handlePromote = () => {
        setPromoteModalData({
            isOpen: true,
            jobId: job.id,
            jobTitle: job.title,
        });
    };

    const handleConfirmPromote = (plan: string) => {
        toast.success(`Successfully promoted job as ${plan.toUpperCase()}`);
        setPromoteModalData({ isOpen: false, jobId: '', jobTitle: '' });
    };

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16'>
            <JobDetailHeader
                title={job.title}
                status={job.status}
                location={job.location}
                type={job.type}
                onBack={handleBack}
                onShare={handleShare}
                onEdit={handleEdit}
            />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2 flex flex-col gap-8'>
                    <JobQuickStats
                        salary={job.salary}
                        experience={job.experience}
                        postedDate={job.postedDate}
                        expirationDate={job.expirationDate}
                    />
                    <JobMainContent
                        description={job.description}
                        requirements={job.requirements}
                        benefits={job.benefits}
                    />
                </div>

                <JobSidebar
                    applications={job.applications}
                    views={job.views}
                    skills={job.skills}
                    onViewApplications={handleViewApplications}
                    onPromote={handlePromote}
                />
            </div>

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
