import { Check, Info } from 'lucide-react';

interface PlanBenefitsCardProps {
    maxJobPosts?: number;
    activeJobsCount?: number;
    remainingJobPosts?: number;
}

export default function PlanBenefitsCard({
    maxJobPosts = 0,
    activeJobsCount = 0,
    remainingJobPosts = 0,
}: PlanBenefitsCardProps) {
    return (
        <div className='bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col h-full'>
            <h3 className='text-sm font-bold text-gray-900 mb-2'>
                Plan Benefits
            </h3>
            <p className='text-xs text-gray-500 mb-6'>
                Maximize your recruitment potential with our premium features.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8'>
                <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check size={16} className='text-blue-600 shrink-0' />
                    <span>Urgents & Featured Jobs</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check size={16} className='text-blue-600 shrink-0' />
                    <span>Highlights Job with Colors</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check size={16} className='text-blue-600 shrink-0' />
                    <span>Access & Saved 20 Candidates</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check size={16} className='text-blue-600 shrink-0' />
                    <span>60 Days Resume Visibility</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check size={16} className='text-blue-600 shrink-0' />
                    <span>24/7 Critical Support</span>
                </div>
            </div>
            <div className='pt-6 border-t border-gray-100'>
                <p className='text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider'>
                    Current Usage
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6'>
                    <div className='flex items-center gap-3 text-sm text-gray-700'>
                        <div className='p-1 rounded-md bg-blue-50 text-blue-600 shrink-0'>
                            <Info size={14} />
                        </div>
                        <span className='font-medium text-gray-900'>
                            {maxJobPosts}
                        </span>
                        <span className='text-gray-500'>Max Posts</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-700'>
                        <div className='p-1 rounded-md bg-emerald-50 text-emerald-600 shrink-0'>
                            <Info size={14} />
                        </div>
                        <span className='font-medium text-gray-900'>
                            {activeJobsCount}
                        </span>
                        <span className='text-gray-500'>Active Jobs</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-700'>
                        <div className='p-1 rounded-md bg-orange-50 text-orange-600 shrink-0'>
                            <Info size={14} />
                        </div>
                        <span className='font-medium text-gray-900'>
                            {remainingJobPosts}
                        </span>
                        <span className='text-gray-500'>Remaining</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
