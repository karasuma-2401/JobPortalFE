import { Skeleton } from '../../../../components/ui/Skeleton';

export default function KanbanBoardSkeleton() {
    const columns = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

    return (
        <div className='flex gap-8 flex-1 min-h-0 relative'>
            <div className='flex-1 flex gap-6 overflow-x-auto pb-4'>
                {columns.map((col, idx) => (
                    <div
                        key={idx}
                        className='flex flex-col w-[320px] shrink-0 h-full bg-gray-50/50 rounded-xl p-2 border border-transparent'
                    >
                        <div className='flex items-center justify-between mb-4 px-2 pt-2'>
                            <div className='flex items-center gap-2'>
                                <Skeleton className='h-5 w-24' />{' '}
                                <Skeleton className='h-5 w-8' />{' '}
                            </div>
                            <Skeleton className='h-6 w-6 rounded-md' />{' '}
                        </div>
                        <div className='flex-1 overflow-y-auto px-2 pb-2 space-y-4 scrollbar-hide'>
                            {[1, 2].map((cardIdx) => (
                                <div
                                    key={cardIdx}
                                    className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5'
                                >
                                    <div className='flex items-start justify-between'>
                                        <div className='flex items-center gap-3 w-full'>
                                            <Skeleton className='w-12 h-12 rounded-full shrink-0' />
                                            <div className='flex flex-col gap-2 w-full'>
                                                <Skeleton className='h-4 w-32' />
                                                <Skeleton className='h-3 w-20' />
                                            </div>
                                        </div>
                                        <Skeleton className='w-5 h-5 rounded-md shrink-0' />
                                    </div>
                                    <div className='space-y-2.5'>
                                        <div className='flex gap-2'>
                                            <Skeleton className='h-3 w-16 shrink-0' />
                                            <Skeleton className='h-3 w-full' />
                                        </div>
                                        <div className='flex gap-2'>
                                            <Skeleton className='h-3 w-16 shrink-0' />
                                            <Skeleton className='h-3 w-24' />
                                        </div>
                                    </div>
                                    <Skeleton className='h-9 w-full rounded-md' />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
