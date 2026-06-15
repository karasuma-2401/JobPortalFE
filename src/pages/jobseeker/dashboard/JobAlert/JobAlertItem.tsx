import {
    MapPin,
    Clock,
    Briefcase,
    Building2,
    DollarSign,
    ArrowRight,
} from 'lucide-react';
import type { Job } from '../../../../types/jobseeker';

interface JobAlertItemProps {
    job: Job;
    onViewDetail?: (id: string) => void;
}

export default function JobAlertItem({ job, onViewDetail }: JobAlertItemProps) {
    return (
        <div
            onClick={() => onViewDetail?.(job.id)}
            className='group flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-100 bg-bg-white p-6 transition-all hover:border-primary-200 hover:shadow-sm'
        >
            <div className='flex items-center gap-5 flex-1'>
                <div className='p-1.5 bg-bg-white border border-gray-100 rounded-xl shadow-sm shrink-0'>
                    <img
                        src={job.logo || '/company-placeholder.png'}
                        alt={job.companyName}
                        className='h-12 w-12 rounded-lg object-contain'
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                '/company-placeholder.png';
                        }}
                    />
                </div>
                <div className='space-y-1.5 text-left flex-1'>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-base font-bold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-1'>
                            {job.title}
                        </h3>
                        {job.isFeatured && (
                            <span className='rounded-md bg-warning-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-warning-600'>
                                Featured
                            </span>
                        )}
                    </div>

                    <div className='flex items-center gap-1.5 text-sm text-gray-700 font-medium'>
                        <Building2 size={14} className='text-gray-400' />
                        <span>{job.companyName}</span>
                    </div>

                    <div className='flex flex-wrap items-center gap-5 text-[13px] text-gray-600 font-medium'>
                        {job.location && (
                            <div className='flex items-center gap-1.5'>
                                <MapPin size={14} className='text-gray-400' />
                                <span className='truncate max-w-[150px]'>
                                    {job.location}
                                </span>
                            </div>
                        )}
                        {job.type && (
                            <div className='flex items-center gap-1.5'>
                                <Briefcase
                                    size={14}
                                    className='text-gray-400'
                                />
                                <span>{job.type}</span>
                            </div>
                        )}
                        {job.salary && (
                            <div className='flex items-center gap-1.5'>
                                <DollarSign
                                    size={14}
                                    className='text-gray-400'
                                />
                                <span className='text-primary-600 font-bold'>
                                    {job.salary}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-5 shrink-0 justify-end w-full sm:w-auto'>
                <div className='hidden sm:flex flex-col items-end gap-1.5'>
                    <span className='flex items-center gap-1.5 text-xs text-primary-600 font-semibold bg-primary-50 px-3 py-1.5 rounded-md'>
                        <Clock size={14} className='text-primary-400' />
                        {job.daysRemaining || 'New'}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail?.(job.id);
                    }}
                    className='px-6 py-2.5 flex items-center justify-center gap-2 text-[14px] font-bold rounded-lg bg-blue-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-bg-white transition-all w-full sm:w-auto'
                >
                    View Job
                    <ArrowRight
                        size={16}
                        className='group-hover:translate-x-1 transition-transform'
                    />
                </button>
            </div>
        </div>
    );
}
