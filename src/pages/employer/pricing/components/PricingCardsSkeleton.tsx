import { Skeleton } from '../../../../components/ui/Skeleton';

export default function PricingCardsSkeleton() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4 md:px-0'>
            {[0, 1, 2].map((i) => {
                const isRecommended = i === 1;

                return (
                    <div
                        key={i}
                        className={`relative flex flex-col p-8 bg-white rounded-2xl ${
                            isRecommended
                                ? 'border-2 border-gray-200 shadow-xl z-10 md:scale-105'
                                : 'border border-gray-100 shadow-sm mt-4 md:mt-0'
                        }`}
                    >
                        {isRecommended && (
                            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <Skeleton className='h-6 w-28 rounded-full' />
                            </div>
                        )}
                        <div className='pb-6 border-b border-gray-100 mb-6'>
                            <Skeleton className='h-7 w-32 mb-4' />
                            <div className='space-y-2 mb-6'>
                                <Skeleton className='h-3 w-full' />
                                <Skeleton className='h-3 w-4/5' />
                            </div>
                            <div className='flex items-end gap-2'>
                                <Skeleton className='h-12 w-24' />
                                <Skeleton className='h-4 w-12 mb-2' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-4 mb-8 flex-1'>
                            {[1, 2, 3, 4, 5, 6].map((j) => (
                                <div
                                    key={j}
                                    className='flex items-center gap-3'
                                >
                                    <Skeleton className='w-5 h-5 rounded-full shrink-0' />
                                    <Skeleton className='h-4 w-full' />
                                </div>
                            ))}
                        </div>
                        <Skeleton className='h-12 w-full rounded-xl' />
                    </div>
                );
            })}
        </div>
    );
}
