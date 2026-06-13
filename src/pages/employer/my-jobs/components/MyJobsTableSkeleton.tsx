import { Skeleton } from '../../../../components/ui/Skeleton';

export default function MyJobsTableSkeleton() {
    return (
        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-50 border-b border-gray-100'>
                            <th className='px-6 py-4'>
                                <Skeleton className='h-4 w-16' />
                            </th>
                            <th className='px-6 py-4'>
                                <Skeleton className='h-4 w-16' />
                            </th>
                            <th className='px-6 py-4'>
                                <Skeleton className='h-4 w-28' />
                            </th>
                            <th className='px-6 py-4'>
                                <Skeleton className='h-4 w-16' />
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {[...Array(6)].map((_, i) => (
                            <tr
                                key={i}
                                className='border-l-4 border-l-transparent'
                            >
                                <td className='px-6 py-4'>
                                    <Skeleton className='h-5 w-3/4 mb-2' />
                                    <Skeleton className='h-3 w-1/2' />
                                </td>
                                <td className='px-6 py-4'>
                                    <Skeleton className='h-7 w-20 rounded-md' />
                                </td>
                                <td className='px-6 py-4'>
                                    <Skeleton className='h-5 w-32' />
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center gap-3'>
                                        <Skeleton className='h-9 w-36 rounded-md' />
                                        <Skeleton className='h-8 w-8 rounded-md' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
