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
            className={`flex items-center justify-between p-6 border rounded-xl bg-white cursor-pointer transition-all ${
                isSelected
                    ? 'border-primary-500 bg-blue-50/50 border-2 shadow-sm ring-1 ring-primary-500/10'
                    : 'border-gray-100'
            }`}
        >
            <div className='flex items-center gap-6 flex-1'>
                <img
                    src={logo}
                    alt={role}
                    className='w-14 h-14 rounded-full object-cover shrink-0'
                />

                <div className='flex-1 space-y-1.5 text-left'>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-base font-bold text-gray-900'>
                            {role}
                        </h3>
                        <span className='text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-primary-500'>
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

                        <div
                            className={`flex items-center gap-2 font-medium ${isExpired ? 'text-danger-500' : 'text-gray-500'}`}
                        >
                            {isExpired ? (
                                <XCircle
                                    size={16}
                                    className='text-danger-500'
                                />
                            ) : (
                                <CalendarDays
                                    size={16}
                                    className='text-gray-400'
                                />
                            )}
                            {timeStatus}
                        </div>
                    </div>
                </div>
            </div>

      <div className="flex items-center gap-5">
        {/* Nút Bookmark */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            if (onBookmarkClick) onBookmarkClick(id);
          }}
          className="text-gray-900 hover:text-gray-600 transition-colors"
          title="Remove from Favorite"
        >
          <Bookmark size={20} fill="currentColor" className="text-primary-500" />
        </button>

        {isExpired ? (
          <button
            disabled
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-3.5 flex items-center justify-center text-[15px] font-bold rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed w-[160px]"
          >
            Deadline Expired
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              if (onApplyClick) onApplyClick(id);
            }}
            className={`px-6 py-3.5 flex items-center justify-center gap-3 text-[15px] font-bold rounded-lg transition-colors w-[160px] ${
              isSelected
                ? "bg-primary-500 text-white shadow-sm"
                : "bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white"
            }`}
          >
            Apply Now <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
