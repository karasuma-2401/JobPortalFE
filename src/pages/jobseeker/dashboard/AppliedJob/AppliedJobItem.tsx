import {
    MapPin,
    DollarSign,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
} from 'lucide-react';
import { DEFAULT_IMAGE } from '../../../../bases/constants/app';

export interface AppliedJobItemProps {
    id: string;
    logo: string;
    role: string;
    type: string;
    jobPostId: string;
    location: string;
    salary: string;
    dateApplied: string;
    status: string;
    isSelected: boolean;
    onSelect: () => void;
}

export default function AppliedJobItem({
    id,
    logo,
    jobPostId,
    role,
    type,
    location,
    salary,
    dateApplied,
    status,
    isSelected,
    onSelect,
}: AppliedJobItemProps) {
    const handleNavigation = () => {
        const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
        window.open(FRONTEND_URL + '/job/' + jobPostId, '_blank');
    };
    const getStatusStyle = (currentStatus: string) => {
        const s = currentStatus?.toUpperCase() || 'PENDING';
        if (s === 'ACCEPTED')
            return {
                color: 'text-green-600',
                bg: 'bg-green-50',
                border: 'border-green-200',
                icon: <CheckCircle2 size={16} />,
            };
        if (s === 'REJECTED')
            return {
                color: 'text-red-600',
                bg: 'bg-red-50',
                border: 'border-red-200',
                icon: <XCircle size={16} />,
            };
        if (s === 'REVIEWING')
            return {
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                icon: <Eye size={16} />,
            };

        return {
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            icon: <Clock size={16} />,
        };
    };

    const statusStyle = getStatusStyle(status);

    return (
        <div
            onClick={onSelect}
            className={`flex items-center px-6 py-5 border rounded-xl bg-white cursor-pointer transition-all hover:shadow-md ${
                isSelected
                    ? 'border-primary-500 bg-blue-50/30 border-2 shadow-sm ring-1 ring-primary-500/10'
                    : 'border-gray-200 hover:border-primary-300'
            }`}
        >
            <div className='flex items-center gap-5 flex-1'>
                <img
                    src={logo || DEFAULT_IMAGE || id}
                    alt={'Employer logo'}
                    className='w-14 h-14 rounded-xl object-contain p-1 bg-white shrink-0 border border-gray-100 shadow-sm'
                />
                <div className='space-y-1.5 text-left'>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-base font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1'>
                            {role || 'Unknown Position'}
                        </h3>
                        <span className='text-[11px] font-extrabold px-2.5 py-1 rounded-md bg-blue-50 text-primary-600 tracking-wide'>
                            {type}
                        </span>
                    </div>
                    <div className='flex items-center gap-5 text-[13px] font-medium text-gray-500'>
                        <div className='flex items-center gap-1.5'>
                            <MapPin size={14} className='text-gray-400' />
                            <span className='truncate max-w-[150px]'>
                                {location}
                            </span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <DollarSign size={14} className='text-gray-400' />
                            {salary}
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[160px] text-sm font-medium text-gray-500 text-left'>
                {dateApplied}
            </div>

            {/* 🌟 Dynamic Status Badge */}
            <div className='w-[140px] text-left'>
                <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}
                >
                    {statusStyle.icon}
                    {status || 'PENDING'}
                </div>
            </div>

            <div className='w-[140px] flex justify-end'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNavigation();
                    }}
                    className={`px-5 py-2 text-[14px] font-bold rounded-lg transition-all w-full text-center ${
                        isSelected
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'bg-primary-500 border border-primary-600 text-white hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200'
                    }`}
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
