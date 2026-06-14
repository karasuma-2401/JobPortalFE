import { useMemo, useState } from 'react';
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
import { useAdminEmployerById } from '../../../hooks/admin/useAdminEmployerById';
import { useAdminEmployerApprovalMutation } from '../../../hooks/admin/useAdminEmployerApprovalMutation';
import { type EmployerProfileResponse } from '../../../types/admin';

type EmployerProfileView = {
    id: string;
    companyName: string;
    email: string;
    industry: string;
    registrationDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    logoUrl: string;
    bannerUrl: string;
    address: string;
    website: string;
    businessLicenseUrl: string | null;
    description: string;
};

// Hàm hỗ trợ nối Base URL cho ảnh nếu Database chỉ lưu đường dẫn tương đối
const getFullImageUrl = (url: string | null | undefined, fallbackName?: string) => {
    if (!url) {
        return fallbackName
            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=2563eb&size=200`
            : 'https://via.placeholder.com/800x200?text=No+Banner'; // Fallback cho banner
    }
    if (url.startsWith('http')) return url;
    
    // Đổi lại URL này thành URL Backend thực tế của bạn hoặc dùng biến môi trường
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const toEmployerProfileView = (emp: EmployerProfileResponse): EmployerProfileView => {
    return {
        id: String(emp.id),
        companyName: emp.companyName,
        email: emp.email,
        industry: emp.industry,
        registrationDate: emp.createdAt
            ? new Date(emp.createdAt).toLocaleString()
            : 'N/A',
        status:
            emp.approvalStatus === 'PENDING'
                ? 'Pending'
                : emp.approvalStatus === 'APPROVED'
                  ? 'Approved'
                  : 'Rejected',
        // Áp dụng hàm sửa lỗi ảnh ở đây
        logoUrl: getFullImageUrl(emp.logo, emp.companyName),
        bannerUrl: getFullImageUrl(emp.banner),
        address: emp.address,
        website: emp.companyWebsite,
        businessLicenseUrl: emp.businessLicense || null,
        description: emp.description,
    };
};

export default function EmployerReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const employerId = id ? Number(id) : undefined;

    const { data: employer, isLoading } = useAdminEmployerById(employerId);
    const approvalMutation = useAdminEmployerApprovalMutation();

    const view = useMemo(() => {
        if (!employer) return null;
        return toEmployerProfileView(employer);
    }, [employer]);

    const handleApprove = async () => {
        if (employerId == null) return;
        await approvalMutation.mutateAsync({
            id: employerId,
            approvalStatus: 'APPROVED',
        });
        toast.success('Employer approved');
        navigate('/admin/employer-approvals');
    };

    const handleReject = async (reason: string) => {
        if (employerId == null) return;
        await approvalMutation.mutateAsync({
            id: employerId,
            approvalStatus: 'REJECTED',
            rejectionReason: reason,
        });
        toast.success('Employer rejected');
        setIsModalOpen(false);
        navigate('/admin/employer-approvals');
    };

    return (
        <div className='animate-in fade-in duration-500 pb-16'>
            {/* Giữ nguyên phần Header (các nút bấm) */}
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
                        disabled={isLoading}
                    >
                        <XCircle size={18} /> Reject Profile
                    </button>
                    <button
                        onClick={handleApprove}
                        className='flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition-colors shadow-sm shadow-green-100'
                        disabled={isLoading || !view}
                    >
                        <CheckCircle2 size={18} /> Approve Profile
                    </button>
                </div>
            </div>

            {isLoading || !view ? (
                <div className='flex items-center justify-center h-[300px]'>
                    <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
                </div>
            ) : (
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                    <div className='h-64 w-full relative bg-gray-100'>
                        <img
                            src={view.bannerUrl}
                            alt='Company Banner'
                            className='w-full h-full object-cover'
                        />
                    </div>

                    <div className='px-8 pb-8'>
                        <div className='flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8 relative z-10'>
                            <div className='w-32 h-32 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0'>
                                <img
                                    src={view.logoUrl}
                                    alt={view.companyName}
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            <div className='pb-2 text-center sm:text-left flex-1'>
                                <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                                    {view.companyName}
                                </h1>

                                <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 justify-center sm:justify-start'>
                                    <span className='flex items-center gap-1.5'>
                                        <Building2 size={16} /> {view.industry}
                                    </span>
                                    <span className='flex items-center gap-1.5'>
                                        <MapPin size={16} /> {view.address}
                                    </span>
                                    <a
                                        href={view.website}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='flex items-center gap-1.5 text-blue-600 hover:underline'
                                    >
                                        <Globe size={16} /> {view.website}
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
                                    
                                    {/* FIX HTML Ở ĐÂY: Dùng dangerouslySetInnerHTML và bỏ whitespace-pre-line */}
                                    <div 
                                        className='text-sm text-gray-600 leading-relaxed p-6 bg-gray-50 rounded-xl border border-gray-100'
                                        dangerouslySetInnerHTML={{ __html: view.description }}
                                    />
                                </section>
                            </div>

                            {/* Giữ nguyên Sidebar bên phải */}
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
                                            {view.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                                            Registered At
                                        </p>
                                        <p className='text-sm font-semibold text-gray-900'>
                                            {view.registrationDate}
                                        </p>
                                    </div>
                                </div>

                                <div className='p-6 border border-gray-100 rounded-xl bg-blue-50/50'>
                                    <h3 className='text-sm font-bold text-gray-900 mb-4'>
                                        Business Document
                                    </h3>
                                    {view.businessLicenseUrl ? (
                                        <div className='flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0'>
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className='text-sm font-bold text-gray-900 line-clamp-1'>
                                                        Business_License.pdf
                                                    </p>
                                                </div>
                                            </div>
                                            <a
                                                href={view.businessLicenseUrl}
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
            )}

            <RejectReasonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleReject}
                companyName={view?.companyName ?? 'Employer'}
            />
        </div>
    );
}