import { Skeleton } from '../../../../components/ui/Skeleton';

export default function JobDetailSkeleton() {
    return (
        <div className='w-full max-w-7xl mx-auto pb-16'>
            <div className='mb-6'>
                <Skeleton className='h-5 w-32 mb-6' />
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8'>
                    <div>
                        <div className='flex items-center gap-3 mb-3'>
                            <Skeleton className='h-9 w-64' />
                            <Skeleton className='h-7 w-20 rounded-md' />{' '}
                        </div>
                        <div className='flex items-center gap-4'>
                            <Skeleton className='h-5 w-32' />
                            <Skeleton className='h-5 w-32' />
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Skeleton className='h-11 w-28 rounded-xl' />{' '}
                        <Skeleton className='h-11 w-32 rounded-xl' />{' '}
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2 flex flex-col gap-8'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className='bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-2'
                            >
                                <Skeleton className='w-10 h-10 rounded-xl' />
                                <Skeleton className='h-3 w-16 mt-1' />
                                <Skeleton className='h-4 w-24' />
                            </div>
                        ))}
                    </div>

                    <div className='bg-white rounded-2xl border border-gray-100 p-8'>
                        <Skeleton className='h-6 w-40 mb-5' />{' '}
                        <div className='space-y-3 mb-8'>
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-5/6' />
                        </div>
                        <Skeleton className='h-6 w-36 mb-5' />{' '}
                        <div className='space-y-4 mb-8'>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className='flex gap-3'>
                                    <Skeleton className='w-2 h-2 rounded-full mt-1.5 shrink-0' />
                                    <Skeleton className='h-4 w-full max-w-md' />
                                </div>
                            ))}
                        </div>
                        <Skeleton className='h-6 w-28 mb-5' />{' '}
                        <div className='space-y-4'>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className='flex gap-3'>
                                    <Skeleton className='w-2 h-2 rounded-full mt-1.5 shrink-0' />
                                    <Skeleton className='h-4 w-full max-w-sm' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='lg:col-span-1 flex flex-col gap-6'>
                    <div className='bg-white rounded-2xl border border-gray-100 p-6'>
                        <Skeleton className='h-6 w-36 mb-6' />
                        <div className='flex flex-col gap-6 mb-8'>
                            {[...Array(2)].map((_, i) => (
                                <div
                                    key={i}
                                    className='flex items-center justify-between'
                                >
                                    <div className='flex items-center gap-3'>
                                        <Skeleton className='w-10 h-10 rounded-xl' />
                                        <Skeleton className='h-4 w-24' />
                                    </div>
                                    <Skeleton className='h-5 w-8' />
                                </div>
                            ))}
                        </div>
                        <Skeleton className='h-12 w-full rounded-xl' />
                    </div>

                    <div className='bg-white rounded-2xl border border-gray-100 p-6'>
                        <Skeleton className='h-6 w-32 mb-5' />
                        <div className='flex flex-wrap gap-2'>
                            <Skeleton className='h-8 w-20 rounded-lg' />
                            <Skeleton className='h-8 w-24 rounded-lg' />
                            <Skeleton className='h-8 w-16 rounded-lg' />
                            <Skeleton className='h-8 w-28 rounded-lg' />
                        </div>
                    </div>

                    <Skeleton className='h-64 w-full rounded-2xl' />
                </div>
            </div>
        </div>
    );
}
