import { MapPin, DollarSign, Check } from 'lucide-react';
import { DEFAULT_IMAGE } from '../../../../bases/constants/app';

export interface AppliedJobItemProps {
    id: string;
    logo: string;
    role: string;
    type: string;
    jobPostId : string; 
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
    type,
    location,
    salary,
    dateApplied,
    status,
    isSelected,
    onSelect,
}: AppliedJobItemProps) {
    const handleNavigation = () => {
        const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL
        window.open(FRONTEND_URL + "/job" + "/" + jobPostId , "_blank")
    };
    return (
        <div
            onClick={onSelect}
            className={`flex items-center px-6 py-5 border rounded-xl bg-white cursor-pointer transition-all ${
                isSelected
                    ? 'border-primary-500 bg-blue-50/50 border-2 shadow-sm ring-1 ring-primary-500/10'
                    : 'border-gray-100 hover:bg-gray-50/50'
            }`}
        >
            <div className='flex items-center gap-5 flex-1'>
                <img
                    src={logo || DEFAULT_IMAGE || id}
                    alt={'Employer logo'}
                    className='w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100'
                />
                <div className='space-y-1.5 text-left'>
                    <div className='flex items-center gap-3'>
                        <span className='text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-primary-500'>
                            {type}
                        </span>
                    </div>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1.5'>
                            <MapPin size={15} className='text-gray-400' />
                            {location}
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <DollarSign size={15} className='text-gray-400' />
                            {salary}
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[180px] text-sm font-medium text-gray-600 text-left'>
                {dateApplied}
            </div>

            <div className='w-[120px] flex items-center gap-2 text-sm font-semibold text-green-600 text-left'>
                <Check size={18} className='text-green-500' strokeWidth={3} />
                {status}
            </div>

            <div className='w-[140px] flex justify-end'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNavigation();
                    }}
                    className={`px-5 py-2.5 text-[14px] font-bold rounded-lg transition-colors w-full text-center ${
                        isSelected
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white'
                    }`}
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
