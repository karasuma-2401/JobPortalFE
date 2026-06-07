import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmployerTable from './components/EmployerTable';
import { type EmployerProfile, type ApprovalStatus } from './components/types';

const MOCK_EMPLOYERS: EmployerProfile[] = [
    {
        id: 'EMP-001',
        companyName: 'TechVision Inc.',
        email: 'contact@techvision.com',
        industry: 'Information Technology',
        registrationDate: '2024-03-20 10:30',
        status: 'Pending',
        logoUrl:
            'https://ui-avatars.com/api/?name=TV&background=2563eb&color=fff',
        bannerUrl: '',
        address: '',
        website: '',
        businessLicenseUrl: null,
        description: '',
    },
    {
        id: 'EMP-002',
        companyName: 'Global Solutions',
        email: 'hello@global.com',
        industry: 'Finance & Banking',
        registrationDate: '2024-03-19 14:15',
        status: 'Approved',
        logoUrl:
            'https://ui-avatars.com/api/?name=GS&background=059669&color=fff',
        bannerUrl: '',
        address: '',
        website: '',
        businessLicenseUrl: null,
        description: '',
    },
    {
        id: 'EMP-003',
        companyName: 'Alpha Startups',
        email: 'join@alpha.co',
        industry: 'Healthcare',
        registrationDate: '2024-03-18 09:00',
        status: 'Rejected',
        logoUrl:
            'https://ui-avatars.com/api/?name=AS&background=dc2626&color=fff',
        bannerUrl: '',
        address: '',
        website: '',
        businessLicenseUrl: null,
        description: '',
    },
    {
        id: 'EMP-004',
        companyName: 'Omega Corp',
        email: 'admin@omega.net',
        industry: 'Manufacturing',
        registrationDate: '2024-03-21 11:45',
        status: 'Pending',
        logoUrl:
            'https://ui-avatars.com/api/?name=OC&background=4f46e5&color=fff',
        bannerUrl: '',
        address: '',
        website: '',
        businessLicenseUrl: null,
        description: '',
    },
];

const TABS: { label: string; value: ApprovalStatus }[] = [
    { label: 'Pending Review', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
];

export default function EmployerApprovalPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ApprovalStatus>('Pending');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmployers = useMemo(() => {
        return MOCK_EMPLOYERS.filter((employer) => {
            const matchesTab = employer.status === activeTab;
            const matchesSearch =
                employer.companyName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                employer.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

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
                                onClick={() => setActiveTab(tab.value)}
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white'
                        />
                    </div>
                </div>

                <EmployerTable
                    employers={filteredEmployers}
                    onReview={handleReview}
                />
            </div>
        </div>
    );
}
