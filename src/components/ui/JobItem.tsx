import {
    Bookmark,
    MapPin,
    DollarSign,
    CalendarDays,
    ArrowRight,
    XCircle,
} from 'lucide-react';

export interface JobItemProps {
  id: string | number;
  logo: string;
  title: string;    
  type: string;      
  location: string;
  salary: string;
  timeStatus: string; 
  
  isExpired?: boolean;    
  isFeatured?: boolean; 
  isBookmarked?: boolean; 
  isSelected?: boolean;   
  
  onSelect?: () => void;
  onDoubleClick?: () => void; 
  onBookmarkClick?: (id: string | number) => void;
  onApplyClick?: (id: string | number) => void;
}

export default function JobItem({
  id,
  logo,
  title,
  type,
  location,
  salary,
  timeStatus,
  isExpired = false,
  isFeatured = false,
  isBookmarked = false,
  isSelected = false,
  onSelect,
  onDoubleClick, // Nhận prop ở đây
  onBookmarkClick,
  onApplyClick,
}: JobItemProps) {
  
  return (
    <div
      onClick={onSelect} 
      onDoubleClick={onDoubleClick} 
      className={`flex items-center justify-between p-6 border rounded-xl bg-white transition-all ${
        onSelect || onDoubleClick ? "cursor-pointer" : "cursor-default"
      } ${
        isSelected
          ? "border-primary-500 bg-blue-50/50 border-2 shadow-sm ring-1 ring-primary-500/10" 
          : isFeatured 
          ? "border-amber-200 bg-amber-50/5 hover:shadow-md" 
          : "border-gray-100 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-6 flex-1">
        <img
          src={logo}
          alt={title}
          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-gray-100"
        />

                <div className='flex-1 space-y-1.5 text-left'>
                    <div className='flex items-center gap-3 flex-wrap'>
                        <h3 className='text-base font-bold text-gray-900 hover:text-primary-500 transition-colors'>
                            {title}
                        </h3>

                        <span className='text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-primary-500'>
                            {type}
                        </span>

                        {isFeatured && (
                            <span className='bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider scale-95'>
                                Featured
                            </span>
                        )}
                    </div>

                    <div className='flex items-center gap-6 text-sm text-gray-500 flex-wrap'>
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
                                <>
                                    <XCircle
                                        size={16}
                                        className='text-danger-500'
                                    />
                                    <span>{timeStatus}</span>
                                </>
                            ) : (
                                <>
                                    <CalendarDays
                                        size={16}
                                        className='text-gray-400'
                                    />
                                    <span>{timeStatus}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-5 shrink-0'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onBookmarkClick) onBookmarkClick(id);
                    }}
                    className={`transition-colors ${
                        isBookmarked
                            ? 'text-primary-500 hover:text-primary-600'
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <Bookmark
                        size={20}
                        fill={isBookmarked ? 'currentColor' : 'none'}
                    />
                </button>

                {isExpired ? (
                    <button
                        disabled
                        onClick={(e) => e.stopPropagation()}
                        className='px-6 py-3.5 flex items-center justify-center text-[15px] font-bold rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed w-[160px]'
                    >
                        Deadline Expired
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onApplyClick) onApplyClick(id);
                        }}
                        className={`px-6 py-3.5 flex items-center justify-center gap-3 text-[15px] font-bold rounded-lg transition-all group w-[160px] ${
                            isSelected
                                ? 'bg-primary-500 text-white shadow-sm'
                                : 'bg-blue-50 text-primary-500 hover:bg-primary-500 hover:text-white'
                        }`}
                    >
                        <span>Apply Now</span>
                        <ArrowRight
                            size={18}
                            className='group-hover:translate-x-0.5 transition-transform'
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
