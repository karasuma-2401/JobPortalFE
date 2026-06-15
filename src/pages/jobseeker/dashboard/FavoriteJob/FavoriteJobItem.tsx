import {
    Bookmark,
    MapPin,
    DollarSign,
    CalendarDays,
    ArrowRight,
    XCircle,
} from 'lucide-react';

export interface FavoriteJobItemProps {
    id: string;
    logo: string;
    role: string;
    type: string;
    location: string;
    salary: string;
    timeStatus: string;
    isExpired?: boolean;
    isSelected: boolean;
    onSelect: () => void;
    onBookmarkClick?: (id: string) => void;
    onApplyClick?: (id: string) => void;
}

export default function FavoriteJobItem({
    id,
    logo,
    role,
    type,
    location,
    salary,
    timeStatus,
    isExpired = false,
    isSelected,
    onSelect,
    onBookmarkClick,
    onApplyClick,
}: FavoriteJobItemProps) {
    return (
        <div
            onClick={onSelect}
            className={`flex items-center justify-between p-6 border rounded-xl bg-white cursor-pointer transition-all hover:shadow-md ${
                isSelected
                    ? 'border-primary-500 bg-blue-50/30 border-2 shadow-sm ring-1 ring-primary-500/10'
                    : 'border-gray-200 hover:border-primary-300'
            }`}
        >
            <div className='flex items-center gap-6 flex-1'>
                <div className='p-1.5 bg-white border border-gray-100 rounded-xl shadow-sm shrink-0'>
                    <img
                        src={logo}
                        alt={role}
                        className='w-14 h-14 rounded-lg object-contain'
                    />
                </div>

                <div className='flex-1 space-y-1.5 text-left'>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-base font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1'>
                            {role}
                        </h3>
                        <span className='text-[11px] font-extrabold px-2.5 py-1 rounded-md bg-blue-50 text-primary-600 tracking-wide'>
                            {type}
                        </span>
                    </div>

                    <div className='flex items-center gap-6 text-[13px] font-medium text-gray-500'>
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

                        <div
                            className={`flex items-center gap-1.5 ${isExpired ? 'text-danger-500' : 'text-gray-500'}`}
                        >
                            {isExpired ? (
                                <XCircle
                                    size={14}
                                    className='text-danger-500'
                                />
                            ) : (
                                <CalendarDays
                                    size={14}
                                    className='text-gray-400'
                                />
                            )}
                            {timeStatus}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-5'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onBookmarkClick) onBookmarkClick(id);
                    }}
                    className='p-2 rounded-full text-primary-500 hover:bg-red-50 hover:text-red-500 transition-colors group'
                    title='Remove from Favorites'
                >
                    <Bookmark
                        size={22}
                        fill='currentColor'
                        className='group-hover:hidden'
                    />
                    <Bookmark size={22} className='hidden group-hover:block' />
                </button>

                {isExpired ? (
                    <button
                        disabled
                        onClick={(e) => e.stopPropagation()}
                        className='px-6 py-3 flex items-center justify-center text-[14px] font-bold rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed w-[150px]'
                    >
                        Expired
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onApplyClick) onApplyClick(id);
                        }}
                        className={`px-6 py-3 flex items-center justify-center gap-2 text-[14px] font-bold rounded-lg transition-all group w-[150px] ${
                            isSelected
                                ? 'bg-primary-500 text-white shadow-sm'
                                : 'bg-blue-50 text-primary-600 hover:bg-primary-600 hover:text-white hover:shadow-md'
                        }`}
                    >
                        Apply Now
                        <ArrowRight
                            size={16}
                            className='group-hover:translate-x-1 transition-transform'
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
