import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmployerTable from './components/EmployerTable';
import { type EmployerProfile, type ApprovalStatus } from './components/types';
import TablePagination from '../../../components/ui/TablePagination';
import { useAdminEmployers } from '../../../hooks/admin/useAdminEmployers';

const TABS: { label: string; value: ApprovalStatus }[] = [
    { label: 'Pending Review', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
];

export default function EmployerApprovalPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ApprovalStatus>('Pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, isLoading } = useAdminEmployers({
        tab: activeTab,
        searchQuery,
        currentPage,
        itemsPerPage,
    });

    const employers = useMemo<EmployerProfile[]>(() => {
        const items = data?.items ?? [];
        return items.map((emp) => ({
            id: String(emp.id),
            companyName: emp.companyName || 'No Name',
            email: emp.email || 'N/A',
            industry: emp.industry || 'N/A',
            registrationDate: emp.createdAt
                ? new Date(emp.createdAt).toLocaleString()
                : 'N/A',
            status:
                emp.approvalStatus === 'PENDING'
                    ? 'Pending'
                    : emp.approvalStatus === 'APPROVED'
                      ? 'Approved'
                      : 'Rejected',
            logoUrl:
                emp.logo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.companyName || '')}&background=random`,
            bannerUrl: emp.banner || '',
            address: emp.address || '',
            website: emp.companyWebsite || '',
            businessLicenseUrl: emp.businessLicense || null,
            description: emp.description || '',
        }));
    }, [data]);

    const totalItems = data?.totalItems ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    const handleReview = (id: string) => {
        navigate(`/admin/employer-approvals/${id}`);
    };

    return (
        <div className='animate-in fade-in duration-500 h-full flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Employer Approvals
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Review and verify employer profiles
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden'>
                <div className='border-b border-gray-200 px-6 shrink-0 bg-gray-50/30'>
                    <div className='flex overflow-x-auto scrollbar-hide'>
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setActiveTab(tab.value);
                                    setCurrentPage(1);
                                }}
                                className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                                    activeTab === tab.value
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>


                <div className='p-5 border-b border-gray-200 shrink-0'>
                    <div className='relative w-full sm:max-w-md'>
                        <Search
                            size={18}
                            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                        />
                        <input
                            type='text'
                            placeholder='Search by Company Name or Email...'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white'
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className='flex-1 flex items-center justify-center p-12'>
                        <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <EmployerTable employers={employers} onReview={handleReview} />
                )}


                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(items) => {
                        setItemsPerPage(items);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </div>
    );
}

