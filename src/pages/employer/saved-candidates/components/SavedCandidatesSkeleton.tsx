import { Skeleton } from '../../../../components/ui/Skeleton';

export default function SavedCandidatesSkeleton() {
    return (
        <div className='flex flex-col gap-3'>
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className='flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl'
                >
                    <div className='flex items-center gap-4'>
                        <Skeleton className='w-12 h-12 rounded-full shrink-0' />
                        <div className='flex flex-col gap-2'>
                            <Skeleton className='h-5 w-36' />
                            <Skeleton className='h-4 w-24' />
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Skeleton className='w-9 h-9 rounded-full shrink-0 hidden sm:block' />
                        <Skeleton className='w-32 h-9.5 rounded-md shrink-0' />
                        <Skeleton className='w-9 h-9 rounded-md shrink-0' />
                    </div>
                </div>
            ))}
        </div>
    );
}
