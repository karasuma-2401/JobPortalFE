import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Building2, Users, Layers } from 'lucide-react';
import JobGridSection from '../../../components/ui/JobGridSection';
import { useEmployerDetail } from './hooks/useEmployerDetail';
import useAuth from '../../../contexts/auth/useAuth';

export default function EmployerDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const positionsRef = useRef<HTMLDivElement>(null);

    const { employerData, openJobs, loading, error } = useEmployerDetail(
        id || ''
    );

    const handleJobDoubleClick = (jobId: string | number) => {
        const authUser = user as { role?: string } | null;

        if (authUser && authUser.role === 'SEEKER') {
            navigate(`/jobseeker/find-job/${jobId}`);
        } else {
            navigate(`/job/${jobId}`);
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center py-20 min-h-screen'>
                <div className='w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (error || !employerData) {
        return (
            <div className='text-center py-20 text-red-500 font-semibold min-h-screen'>
                {error || 'Employer details not found'}
            </div>
        );
    }

    return (
        <div className='w-full bg-[#F8F9FA] py-8 px-8 text-left'>
            <div className='max-w-7xl mx-auto space-y-8'>
                {/* Company Header Card */}
                <div className='w-full bg-white border border-gray-200/60 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm'>
                    <div className='flex items-center gap-5'>
                        <img
                            src={employerData.logo}
                            alt={employerData.name}
                            className='w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm'
                        />
                        <div className='space-y-1'>
                            <h1 className='text-[24px] font-bold text-gray-900'>
                                {employerData.name}
                            </h1>
                            <p className='text-[14px] text-gray-500'>
                                {employerData.category}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            positionsRef.current?.scrollIntoView({
                                behavior: 'smooth',
                            })
                        }
                        className='w-full sm:w-auto px-6 py-3 bg-primary-500 text-white font-bold text-[15px] rounded-lg hover:bg-primary-600 transition-all'
                    >
                        View Open Position →
                    </button>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                    <div className='lg:col-span-2 space-y-8 bg-white border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-sm'>
                        <div className='space-y-3'>
                            <h2 className='text-[18px] font-bold text-gray-900'>
                                Description
                            </h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        employerData.description ||
                                        'No description provided',
                                }}
                                className='text-[14px] text-gray-500 leading-relaxed'
                            ></div>
                        </div>

                        {employerData.benefits &&
                            employerData.benefits.length > 0 && (
                                <div className='space-y-3'>
                                    <h2 className='text-[18px] font-bold text-gray-900'>
                                        Company Benefits
                                    </h2>
                                    <ul className='space-y-2.5 list-disc pl-5 text-[14px] text-gray-500'>
                                        {employerData.benefits.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        {employerData.vision && (
                            <div className='space-y-3'>
                                <h2 className='text-[18px] font-bold text-gray-900'>
                                    Company Vision
                                </h2>
                                <p className='text-[14px] text-gray-500 leading-relaxed'>
                                    {employerData.vision}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='lg:col-span-1 space-y-6'>
                        <div className='bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm space-y-5'>
                            <h3 className='text-[16px] font-bold text-gray-900'>
                                Job Overview
                            </h3>
                            <div className='grid grid-cols-2 gap-y-5 gap-x-4'>
                                <div className='space-y-1'>
                                    <Calendar
                                        size={20}
                                        className='text-primary-500'
                                    />
                                    <p className='text-[11px] text-gray-400 font-bold uppercase'>
                                        Founded In
                                    </p>
                                    <p className='text-[14px] font-semibold text-gray-800'>
                                        {employerData.overview.founded}
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <Building2
                                        size={20}
                                        className='text-primary-500'
                                    />
                                    <p className='text-[11px] text-gray-400 font-bold uppercase'>
                                        Org Type
                                    </p>
                                    <p className='text-[14px] font-semibold text-gray-800'>
                                        {employerData.overview.orgType}
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <Users
                                        size={20}
                                        className='text-primary-500'
                                    />
                                    <p className='text-[11px] text-gray-400 font-bold uppercase'>
                                        Team Size
                                    </p>
                                    <p className='text-[14px] font-semibold text-gray-800'>
                                        {employerData.overview.teamSize}
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <Layers
                                        size={20}
                                        className='text-primary-500'
                                    />
                                    <p className='text-[11px] text-gray-400 font-bold uppercase'>
                                        Industry
                                    </p>
                                    <p className='text-[14px] font-semibold text-gray-800'>
                                        {employerData.overview.industry}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={positionsRef}>
                    <JobGridSection
                        title={`Open Position (${openJobs.length})`}
                        jobs={openJobs}
                        onJobDoubleClick={(jobId) =>
                            handleJobDoubleClick(jobId)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
