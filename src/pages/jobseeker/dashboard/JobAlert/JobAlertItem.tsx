import {
    MapPin,
    DollarSign,
    CalendarDays,
    Bookmark,
    ArrowRight,
} from 'lucide-react';

export interface JobAlertItemProps {
    id: string;
    logo: string;
    role: string;
    type: string;
    location: string;
    salary: string;
    daysRemaining: string;
    isSelected: boolean;
    onSelect: () => void;
}

const logoClearBit = (companyDomain: string) =>
    `https://logo.clearbit.com/${companyDomain}`;

export default function JobAlertItem({
    id,
    logo,
    role,
    type,
    location,
    salary,
    daysRemaining,
    isSelected,
    onSelect,
}: JobAlertItemProps) {
    const activeItemStyles = isSelected
        ? 'border-primary-500 bg-blue-50/50 border-2'
        : 'border-gray-100 bg-white';

    return (
        <div
            className={`p-6 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${activeItemStyles}`}
            onClick={onSelect}
        >
            <div className='flex items-center gap-6 flex-1'>
                <img
                    src={logoClearBit(logo)}
                    alt={`${role} company logo`}
                    className='w-14 h-14 rounded-full object-cover shrink-0'
                />

                <div className='flex-1 space-y-1.5 text-left'>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-base font-bold text-gray-900 group-hover:text-primary-500 transition-colors'>
                            {role}
                        </h3>
                        <span
                            className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                                type === 'Internship'
                                    ? 'bg-orange-50 text-warning-500'
                                    : 'bg-blue-50 text-primary-500'
                            }`}
                        >
                            {type}
                        </span>
                    </div>

                    <div className='flex items-center gap-6 text-sm text-gray-500'>
                        <div className='flex items-center gap-2'>
                            <MapPin size={16} className='text-gray-400' />
                            {location}
                        </div>
                        <div className='flex items-center gap-2'>
                            <DollarSign size={16} className='text-gray-400' />
                            {salary}
                        </div>
                        <div className='flex items-center gap-2'>
                            <CalendarDays size={16} className='text-gray-400' />
                            {daysRemaining}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-5'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Job bookmark clicked: ${id}`);
                    }}
                    className='text-gray-400 hover:text-gray-900 transition-colors'
                >
                    <Bookmark
                        size={20}
                        className={
                            logo.includes('reddit')
                                ? 'fill-danger-500 text-danger-500'
                                : ''
                        }
                    />
                </button>
                <button className='px-6 py-3.5 flex items-center gap-3 text-[15px] font-bold rounded-lg transition-colors bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white'>
                    Apply Now <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
