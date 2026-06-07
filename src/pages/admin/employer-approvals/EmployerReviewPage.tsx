import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    MapPin,
    Globe,
    FileText,
    Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import RejectReasonModal from './components/RejectReasonModal';
import { type EmployerProfile } from './components/types';

const MOCK_DETAIL: EmployerProfile = {
    id: 'EMP-001',
    companyName: 'TechVision Inc.',
    email: 'contact@techvision.com',
    industry: 'Information Technology',
    registrationDate: '2024-03-20 10:30',
    status: 'Pending',
    logoUrl:
        'https://ui-avatars.com/api/?name=TV&background=2563eb&color=fff&size=200',
    bannerUrl:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
    address: '123 Tech Boulevard, San Francisco, CA 94105',
    website: 'https://techvision.example.com',
    businessLicenseUrl: 'https://example.com/license.pdf',
    description:
        'TechVision is a global leader in cloud infrastructure and AI solutions. We provide cutting-edge services to enterprise clients worldwide. Our mission is to accelerate digital transformation.',
};

export default function EmployerReviewPage() {
    // fix id declare but note use
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApprove = () => {
        toast.success(
            `${MOCK_DETAIL.companyName} has been approved successfully.`
        );
        navigate('/admin/employer-approvals');
    };

    const handleReject = (reason: string) => {
        console.log('Reject Reason:', reason);
        toast.success(
            `Rejection reason has been sent to ${MOCK_DETAIL.companyName}.`
        );
        setIsModalOpen(false);
        navigate('/admin/employer-approvals');
    };

    return (
        <div className='animate-in fade-in duration-500 pb-16'>
            <div className='flex items-center justify-between mb-6'>
                <button
                    onClick={() => navigate('/admin/employer-approvals')}
                    className='flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors'
                >
                    <ArrowLeft size={18} /> Back to Approvals
                </button>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='flex items-center gap-2 px-6 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-md hover:bg-red-50 transition-colors shadow-sm'
                    >
                        <XCircle size={18} /> Reject Profile
                    </button>
                    <button
                        onClick={handleApprove}
                        className='flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition-colors shadow-sm shadow-green-100'
                    >
                        <CheckCircle2 size={18} /> Approve Profile
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='h-64 w-full relative bg-gray-100'>
                    <img
                        src={MOCK_DETAIL.bannerUrl}
                        alt='Company Banner'
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='px-8 pb-8'>
                    <div className='flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8 relative z-10'>
                        <div className='w-32 h-32 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0'>
                            <img
                                src={MOCK_DETAIL.logoUrl}
                                alt={MOCK_DETAIL.companyName}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='pb-2 text-center sm:text-left flex-1'>
                            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                                {MOCK_DETAIL.companyName}
                            </h1>
                            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 justify-center sm:justify-start'>
                                <span className='flex items-center gap-1.5'>
                                    <Building2 size={16} />{' '}
                                    {MOCK_DETAIL.industry}
                                </span>
                                <span className='flex items-center gap-1.5'>
                                    <MapPin size={16} /> {MOCK_DETAIL.address}
                                </span>
                                <a
                                    href={MOCK_DETAIL.website}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='flex items-center gap-1.5 text-blue-600 hover:underline'
                                >
                                    <Globe size={16} /> {MOCK_DETAIL.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div className='lg:col-span-2 space-y-8'>
                            <section>
                                <h3 className='text-sm font-bold text-gray-900 uppercase tracking-widest mb-4'>
                                    Company Description
                                </h3>
                                <div className='text-sm text-gray-600 leading-relaxed whitespace-pre-line p-6 bg-gray-50 rounded-xl border border-gray-100'>
                                    {MOCK_DETAIL.description}
                                </div>
                            </section>
                        </div>

                        <div className='space-y-6'>
                            <div className='p-6 border border-gray-100 rounded-xl bg-white space-y-4'>
                                <h3 className='text-sm font-bold text-gray-900 mb-4'>
                                    Registration Info
                                </h3>
                                <div>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                                        Account Email
                                    </p>
                                    <p className='text-sm font-semibold text-gray-900'>
                                        {MOCK_DETAIL.email}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                                        Registered At
                                    </p>
                                    <p className='text-sm font-semibold text-gray-900'>
                                        {MOCK_DETAIL.registrationDate}
                                    </p>
                                </div>
                            </div>

                            <div className='p-6 border border-gray-100 rounded-xl bg-blue-50/50'>
                                <h3 className='text-sm font-bold text-gray-900 mb-4'>
                                    Business Document
                                </h3>
                                {MOCK_DETAIL.businessLicenseUrl ? (
                                    <div className='flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0'>
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold text-gray-900 line-clamp-1'>
                                                    Business_License.pdf
                                                </p>
                                                <p className='text-xs text-gray-500'>
                                                    2.4 MB
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={
                                                MOCK_DETAIL.businessLicenseUrl
                                            }
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-sm font-semibold text-blue-600 hover:text-blue-800'
                                        >
                                            View
                                        </a>
                                    </div>
                                ) : (
                                    <p className='text-sm text-gray-500 italic'>
                                        No business license uploaded.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RejectReasonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleReject}
                companyName={MOCK_DETAIL.companyName}
            />
        </div>
    );
}
