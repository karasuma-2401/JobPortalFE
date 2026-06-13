import { Skeleton } from '../../../../components/ui/Skeleton';

export default function EmployerProfileSkeleton() {
    return (
        <div className='w-full mx-auto pb-16'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                <Skeleton className='h-64 w-full rounded-none' />

                <div className='px-8 pb-8 relative'>
                    <div className='flex flex-col sm:flex-row justify-between items-end sm:items-start gap-4'>
                        <div className='flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative z-10 w-full'>
                            <Skeleton className='w-32 h-32 rounded-xl border-4 border-white shrink-0' />
                            <div className='pb-2 text-center sm:text-left flex-1 w-full flex flex-col items-center sm:items-start'>
                                <Skeleton className='h-8 w-64 mb-4' />{' '}
                                <div className='flex items-center gap-4 w-full justify-center sm:justify-start'>
                                    <Skeleton className='h-4 w-32' />{' '}
                                    <Skeleton className='h-4 w-40' />{' '}
                                </div>
                            </div>
                        </div>
                        <Skeleton className='h-10 w-36 rounded-md mt-4 sm:mt-6 shrink-0' />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8'>
                <div className='xl:col-span-8 flex flex-col gap-8'>
                    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-8'>
                        <div>
                            <Skeleton className='h-6 w-32 mb-4' />{' '}
                            <div className='space-y-2'>
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='h-4 w-5/6' />
                                <Skeleton className='h-4 w-4/5' />
                            </div>
                        </div>
                        <div className='w-full h-px bg-gray-100'></div>
                        <div>
                            <Skeleton className='h-6 w-40 mb-4' />{' '}
                            <Skeleton className='h-24 w-full rounded-lg' />{' '}
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
                        <div className='flex items-center justify-between mb-6'>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-24' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className='flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg border border-gray-100 gap-4'
                                >
                                    <div className='flex-1'>
                                        <Skeleton className='h-5 w-3/4 mb-3' />
                                        <div className='flex gap-4'>
                                            <Skeleton className='h-4 w-20' />
                                            <Skeleton className='h-4 w-24' />
                                            <Skeleton className='h-4 w-28' />
                                        </div>
                                    </div>
                                    <Skeleton className='h-9 w-28 rounded-md shrink-0' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='xl:col-span-4 flex flex-col gap-6'>
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7'>
                        <Skeleton className='h-6 w-48 mb-6' />
                        <div className='flex flex-col gap-6'>
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className='flex items-center gap-4'
                                >
                                    <Skeleton className='w-12 h-12 rounded-xl shrink-0' />
                                    <div className='flex flex-col gap-2'>
                                        <Skeleton className='h-3 w-20' />
                                        <Skeleton className='h-4 w-32' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7'>
                        <Skeleton className='h-6 w-32 mb-6' />
                        <div className='flex flex-col gap-6 mb-8'>
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className='flex items-center gap-4'
                                >
                                    <Skeleton className='w-12 h-12 rounded-xl shrink-0' />
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <Skeleton className='h-3 w-16' />
                                        <Skeleton className='h-4 w-full max-w-50' />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center gap-3 pt-6 border-t border-gray-100'>
                            <Skeleton className='w-11 h-11 rounded-xl' />
                            <Skeleton className='w-11 h-11 rounded-xl' />
                            <Skeleton className='w-11 h-11 rounded-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
