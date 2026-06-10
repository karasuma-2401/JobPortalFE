import { Bell, MapPin, Tag } from 'lucide-react';

export interface JobAlertItemProps {
    id: string;
    keyword: string | null;
    location: string | null;
    category: string | null;
    createdAt: string | null;
    isSelected: boolean;
    onSelect: () => void;
}

export default function JobAlertItem({
    keyword,
    location,
    category,
    createdAt,
    isSelected,
    onSelect,
}: JobAlertItemProps) {
    const activeItemStyles = isSelected
        ? 'border-primary-500 bg-blue-50/50 border-2'
        : 'border-gray-100 bg-white';

    return (
        <div
            className={`flex cursor-pointer items-start justify-between rounded-xl border p-6 transition-all ${activeItemStyles}`}
            onClick={onSelect}
        >
            <div className='flex items-start gap-4 text-left'>
                <div className='rounded-full bg-blue-50 p-3 text-primary-500'>
                    <Bell size={20} />
                </div>
                <div className='space-y-2'>
                    <h3 className='text-base font-bold text-gray-900'>
                        {keyword || 'Any keyword'}
                    </h3>
                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500'>
                        <span className='flex items-center gap-2'>
                            <MapPin size={16} className='text-gray-400' />
                            {location || 'Any location'}
                        </span>
                        <span className='flex items-center gap-2'>
                            <Tag size={16} className='text-gray-400' />
                            {category || 'Any category'}
                        </span>
                    </div>
                    <p className='text-xs text-gray-400'>
                        Created{' '}
                        {createdAt
                            ? new Date(createdAt).toLocaleDateString()
                            : 'recently'}
                    </p>
                </div>
            </div>
        </div>
    );
}
