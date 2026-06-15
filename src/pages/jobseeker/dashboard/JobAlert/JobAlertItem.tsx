import { MapPin, Clock, Briefcase, Building2 } from 'lucide-react';
import type { Job } from '../../../../types/jobseeker';

interface JobAlertItemProps {
    job: Job;
    onViewDetail?: (id: string) => void;
}

export default function JobAlertItem({ job, onViewDetail }: JobAlertItemProps) {
    return (
        <div
            className='flex cursor-pointer items-start justify-between rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-sm'
            onClick={() => onViewDetail?.(job.id)}
        >
            {/* Logo + Info */}
            <div className='flex items-start gap-4'>
                <img
                    src={job.logo || '/company-placeholder.png'}
                    alt={job.companyName}
                    className='h-12 w-12 rounded-lg border border-gray-100 object-contain p-1'
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/company-placeholder.png';
                    }}
                />
                <div className='space-y-1.5'>
                    <h3 className='text-base font-bold text-gray-900 leading-tight'>
                        {job.title}
                    </h3>
                    <div className='flex items-center gap-1.5 text-sm text-gray-500'>
                        <Building2 size={13} className='text-gray-400' />
                        <span>{job.companyName}</span>
                    </div>
                    <div className='flex flex-wrap items-center gap-3 text-xs text-gray-500'>
                        {job.location && (
                            <span className='flex items-center gap-1'>
                                <MapPin size={12} className='text-gray-400' />
                                {job.location}
                            </span>
                        )}
                        {job.type && (
                            <span className='flex items-center gap-1'>
                                <Briefcase size={12} className='text-gray-400' />
                                {job.type}
                            </span>
                        )}
                        {job.salary && (
                            <span className='font-medium text-primary-600'>
                                {job.salary}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Right side: badge + days remaining */}
            <div className='ml-4 flex shrink-0 flex-col items-end gap-2'>
                {job.isFeatured && (
                    <span className='rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600'>
                        Featured
                    </span>
                )}
                <span className='flex items-center gap-1 text-xs text-gray-400'>
                    <Clock size={12} />
                    {job.daysRemaining || 'New'}
                </span>
            </div>
        </div>
    );
}
