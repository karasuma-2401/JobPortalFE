import { Skeleton } from '../../../../components/ui/Skeleton';

export const TableSkeletonRow = () => {
    return (
        <tr className='border-b border-gray-100 last:border-0'>
            <td className='px-6 py-4'>
                <Skeleton className='h-5 w-3/4 mb-2' />
                <Skeleton className='h-3 w-1/2' />
            </td>
            <td className='px-6 py-4'>
                <Skeleton className='h-7 w-24 rounded-md' />
            </td>
            <td className='px-6 py-4'>
                <Skeleton className='h-5 w-32' />
            </td>

            <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                    <Skeleton className='h-9 w-40 rounded-md' />{' '}
                    <Skeleton className='h-8 w-8 rounded-md' />{' '}
                </div>
            </td>
        </tr>
    );
};
