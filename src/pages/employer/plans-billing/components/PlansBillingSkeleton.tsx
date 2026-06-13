import { Skeleton } from '../../../../components/ui/Skeleton';

export default function PlansBillingSkeleton() {
    return (
        <div className='w-full max-w-360 mx-auto pb-16'>
            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
                <div className='xl:col-span-4 flex flex-col gap-8'>
                    <div className='bg-white border border-gray-100 rounded-xl p-6 flex flex-col h-full'>
                        <Skeleton className='h-4 w-24 mb-6' />
                        <div className='mb-8 space-y-3'>
                            <Skeleton className='h-8 w-48 mb-3' />
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-3/4' />
                        </div>
                        <Skeleton className='h-10 w-32 mt-auto rounded-md' />
                    </div>

                    <div className='bg-white border border-gray-100 rounded-xl p-6 flex flex-col h-full'>
                        <Skeleton className='h-4 w-28 mb-6' />
                        <div className='mb-6 space-y-3'>
                            <Skeleton className='h-10 w-32 mb-2' />
                            <Skeleton className='h-4 w-40' />
                            <Skeleton className='h-3 w-48 mb-4' />
                            <Skeleton className='h-3 w-full' />
                        </div>
                    </div>
                </div>
                <div className='xl:col-span-8 flex flex-col gap-8'>
                    <div className='bg-white border border-gray-100 rounded-xl p-6 flex flex-col h-full'>
                        <Skeleton className='h-4 w-32 mb-2' />
                        <Skeleton className='h-3 w-64 mb-6' />

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8'>
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className='flex items-center gap-3'
                                >
                                    <Skeleton className='w-4 h-4 rounded-full shrink-0' />
                                    <Skeleton className='h-4 w-48' />
                                </div>
                            ))}
                        </div>
                        <div className='pt-6 border-t border-gray-100'>
                            <Skeleton className='h-3 w-28 mb-4' />
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6'>
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className='flex items-center gap-3'
                                    >
                                        <Skeleton className='w-6 h-6 rounded-md shrink-0' />
                                        <Skeleton className='h-4 w-12' />
                                        <Skeleton className='h-4 w-24' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='xl:col-span-12 mt-4'>
                    <div className='bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col'>
                        <div className='p-6 border-b border-gray-100'>
                            <Skeleton className='h-4 w-32' />
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left'>
                                <thead>
                                    <tr className='bg-gray-50 border-b border-gray-100'>
                                        <th className='px-6 py-4'>
                                            <Skeleton className='h-3 w-16' />
                                        </th>
                                        <th className='px-6 py-4'>
                                            <Skeleton className='h-3 w-24' />
                                        </th>
                                        <th className='px-6 py-4'>
                                            <Skeleton className='h-3 w-32' />
                                        </th>
                                        <th className='px-6 py-4'>
                                            <Skeleton className='h-3 w-20' />
                                        </th>
                                        <th className='px-6 py-4'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, i) => (
                                        <tr
                                            key={i}
                                            className='border-b border-gray-50 last:border-0'
                                        >
                                            <td className='px-6 py-4'>
                                                <Skeleton className='h-4 w-20' />
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Skeleton className='h-4 w-32' />
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Skeleton className='h-4 w-40' />
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Skeleton className='h-4 w-24' />
                                            </td>
                                            <td className='px-6 py-4 text-right'>
                                                <Skeleton className='h-8 w-8 rounded-md inline-block' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='p-6 border-t border-gray-100 flex items-center justify-center gap-2'>
                            <Skeleton className='w-8 h-8 rounded-full' />
                            <Skeleton className='w-8 h-8 rounded-full' />
                            <Skeleton className='w-8 h-8 rounded-full' />
                            <Skeleton className='w-8 h-8 rounded-full' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
