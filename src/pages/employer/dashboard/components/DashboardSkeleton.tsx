import { Skeleton } from '../../../../components/ui/Skeleton';
import { TableSkeletonRow } from './TableSkeletonRow';

export const DashboardSkeleton = () => (
    <div className='w-full max-w-7xl mx-auto pb-10 space-y-8'>
        <div className='mb-8'>
            <Skeleton className='h-8 w-40 mb-2' />
            <Skeleton className='h-4 w-60' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className='h-32 rounded-2xl' />
            ))}
        </div>
        <div className='bg-white border border-gray-200 rounded-xl mt-8 overflow-hidden'>
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-4 w-20' />
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-50'>
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
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <TableSkeletonRow key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
