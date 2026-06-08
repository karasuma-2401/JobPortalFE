import { useEffect, useMemo } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
    ArrowRight,
    Bookmark,
    Link as LinkIcon,
    Mail,
    Phone,
} from 'lucide-react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import JobOverviewSidebar from './components/JobOverviewSidebar';
import JobGridSection from '../../../components/ui/JobGridSection';
import ApplyJobModal from './components/ApplyJobModal';
import { useJobDetail } from './hooks/useJobDetail';
import useAuth from '../../../contexts/auth/useAuth';
import {
    buildJobApplyPath,
    savePostAuthRedirect,
} from '../../../utils/post-auth-redirect';

const MOCK_RELATED_JOBS = [
    {
        id: '1',
        title: 'Marketing Manager',
        companyName: 'Stripe',
        type: 'Remote',
        isFeatured: true,
        logo: 'https://logo.clearbit.com/stripe.com',
        location: 'New Mexico, USA',
        salary: '$50k-$80k/month',
        daysRemaining: '4 Days Remaining',
    },
    {
        id: '2',
        title: 'Project Manager',
        companyName: 'Shopify',
        type: 'Full Time',
        isFeatured: true,
        logo: 'https://logo.clearbit.com/shopify.com',
        location: 'Dhaka, Bangladesh',
        salary: '$50k-$80k/month',
        daysRemaining: '4 Days Remaining',
    },
];

interface JobDetailPageProps {
    jobId?: string;
}

export default function JobDetailPage({ jobId }: JobDetailPageProps) {
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, isJobSeeker } = useAuth();
    const resolvedJobId = jobId || params.jobId || '';
    const { jobData, loading, error, isSaved, handleToggleSave, handleApplySubmit } =
        useJobDetail(resolvedJobId);

    const shouldAutoOpenApply = useMemo(
        () => searchParams.get('apply') === 'true',
        [searchParams]
    );

    const openApplyFlow = () => {
        const applyPath = buildJobApplyPath(resolvedJobId);

        if (!user) {
            savePostAuthRedirect(applyPath);
            navigate('/login', { replace: true });
            return;
        }

        if (!isJobSeeker) {
            toast.error('Only job seekers can apply for jobs.');
            return;
        }

        if (user.hasProfile === false) {
            savePostAuthRedirect(applyPath);
            toast.info('Complete your seeker profile before applying.');
            navigate('/jobseeker/setup', { replace: true });
            return;
        }

        setSearchParams({ apply: 'true' }, { replace: true });
    };

    useEffect(() => {
        if (!resolvedJobId || !shouldAutoOpenApply) {
            return;
        }

        if (!user) {
            savePostAuthRedirect(buildJobApplyPath(resolvedJobId));
            navigate('/login', { replace: true });
            return;
        }

        if (!isJobSeeker) {
            toast.error('Only job seekers can apply for jobs.');
            setSearchParams({}, { replace: true });
            return;
        }

        if (user.hasProfile === false) {
            savePostAuthRedirect(buildJobApplyPath(resolvedJobId));
            toast.info('Complete your seeker profile before applying.');
            navigate('/jobseeker/setup', { replace: true });
        }
    }, [isJobSeeker, navigate, resolvedJobId, setSearchParams, shouldAutoOpenApply, user]);

    if (!resolvedJobId) {
        return <Navigate to='/find-job' replace />;
    }

    if (loading) {
        return (
            <div className='flex min-h-screen items-center justify-center py-20'>
                <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500' />
            </div>
        );
    }

    if (error || !jobData) {
        return (
            <div className='min-h-screen py-20 text-center font-semibold text-red-500'>
                {error || 'Job not found'}
            </div>
        );
    }

    return (
        <div className='min-h-screen w-full bg-white px-4 py-8 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-7xl'>
                <div className='mb-8 flex flex-col justify-between gap-6 border-b border-gray-100 pb-8 lg:flex-row lg:items-center'>
                    <div className='flex items-start gap-5 sm:items-center'>
                        <img
                            src={jobData.logo}
                            alt={jobData.companyName}
                            className='h-16 w-16 shrink-0 rounded-full border border-gray-100 bg-white p-1 object-cover shadow-sm'
                        />
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex flex-wrap items-center gap-2.5'>
                                <h1 className='text-[22px] font-bold leading-tight text-gray-900 sm:text-[24px]'>
                                    {jobData.title}
                                </h1>
                                {jobData.isFeatured && (
                                    <span className='rounded bg-[#FFEEEC] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#FF4F4F]'>
                                        Featured
                                    </span>
                                )}
                                <span className='rounded-md bg-blue-50 px-2.5 py-0.5 text-[12px] font-semibold text-primary-500'>
                                    {jobData.type}
                                </span>
                            </div>

                            <div className='mt-0.5 flex flex-wrap items-center gap-4 text-[14px] text-gray-500'>
                                <a
                                    href={jobData.website}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='flex items-center gap-1.5 transition-colors hover:text-primary-500'
                                >
                                    <LinkIcon size={15} />
                                    <span>{jobData.website}</span>
                                </a>
                                <span className='hidden text-gray-300 sm:inline'>|</span>
                                <span className='flex items-center gap-1.5'>
                                    <Phone size={15} />
                                    <span>{jobData.phone}</span>
                                </span>
                                <span className='hidden text-gray-300 sm:inline'>|</span>
                                <span className='flex items-center gap-1.5'>
                                    <Mail size={15} />
                                    <span>{jobData.email}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex shrink-0 flex-col items-start gap-3 self-start sm:flex-row sm:items-center lg:items-end lg:self-center'>
                        <div className='flex w-full items-center gap-3 sm:w-auto'>
                            <button
                                onClick={async () => {
                                    if (!user) {
                                        savePostAuthRedirect(`/job/${resolvedJobId}`);
                                        navigate('/login', { replace: true });
                                        return;
                                    }
                                    try {
                                        await handleToggleSave();
                                    } catch (saveError) {
                                        toast.error(
                                            (saveError as Error).message ||
                                                'Failed to update saved state.'
                                        );
                                    }
                                }}
                                className={`rounded-lg p-3.5 transition-colors ${
                                    isSaved
                                        ? 'bg-[#E6F0FA] text-[#0A65CC]'
                                        : 'bg-blue-50 text-primary-500 hover:bg-blue-100'
                                }`}
                            >
                                <Bookmark
                                    size={20}
                                    fill={isSaved ? 'currentColor' : 'none'}
                                />
                            </button>

                            <button
                                onClick={openApplyFlow}
                                className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-[0.98] sm:flex-initial'
                            >
                                <span>Apply Now</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                        <span className='w-full text-[13px] text-gray-400 sm:w-auto sm:text-right'>
                            Job expire in:{' '}
                            <span className='font-medium text-red-500'>
                                {jobData.expireDate}
                            </span>
                        </span>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                    <div className='flex flex-col gap-6 text-[15px] leading-relaxed text-gray-600 lg:col-span-2'>
                        <div>
                            <h3 className='mb-3.5 text-[18px] font-bold text-gray-900'>
                                Job Description
                            </h3>
                            {jobData.description.map((paragraph, index) => (
                                <p key={index} className='mb-4'>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className='mt-2'>
                            <h3 className='mb-3.5 text-[18px] font-bold text-gray-900'>
                                Responsibilities
                            </h3>
                            <ul className='flex list-disc flex-col gap-2.5 pl-5 text-gray-600'>
                                {jobData.responsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className='mt-6 flex items-center gap-3 border-t border-gray-150 pt-6'>
                            <span className='text-[14px] font-semibold text-gray-700'>
                                Share this job:
                            </span>
                            <button className='flex items-center gap-1.5 rounded-md border border-blue-100 px-3 py-1.5 text-[13px] font-medium text-blue-600 transition-colors hover:bg-blue-50'>
                                <FaFacebook size={14} className='fill-current' />
                                Facebook
                            </button>
                            <button className='flex items-center gap-1.5 rounded-md border border-sky-100 px-3 py-1.5 text-[13px] font-medium text-sky-500 transition-colors hover:bg-sky-50'>
                                <FaTwitter size={14} className='fill-current' />
                                Twitter
                            </button>
                        </div>
                    </div>

                    <div className='lg:col-span-1'>
                        <JobOverviewSidebar
                            overview={jobData.overview}
                            profile={jobData.companyProfile}
                            companyName={jobData.companyName}
                            logo={jobData.logo}
                            phone={jobData.phone}
                            email={jobData.email}
                            website={jobData.website}
                        />
                    </div>
                </div>

                <div className='border-t border-gray-100 pt-8'>
                    <JobGridSection
                        title='Related Jobs'
                        jobs={MOCK_RELATED_JOBS}
                        onJobDoubleClick={(id) => navigate(`/job/${id}`)}
                    />
                </div>
            </div>

            <ApplyJobModal
                isOpen={shouldAutoOpenApply && Boolean(user?.hasProfile) && isJobSeeker}
                onClose={() => setSearchParams({}, { replace: true })}
                jobTitle={jobData.title}
                onSubmit={handleApplySubmit}
            />
        </div>
    );
}
