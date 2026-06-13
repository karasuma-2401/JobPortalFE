import { Skeleton } from '../../../../components/ui/Skeleton';

export default function SettingsFormSkeleton() {
    return (
        <div className='flex flex-col gap-8 animate-in fade-in duration-500 w-full'>
            <div className='mb-2'>
                <Skeleton className='h-6 w-48 mb-2' />
                <Skeleton className='h-4 w-64' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-12 w-full rounded-xl' />{' '}
                </div>

                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className='flex flex-col gap-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-12 w-full rounded-xl' />
                    </div>
                ))}
                <div className='flex flex-col gap-2 md:col-span-2 mt-4'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-32 w-full rounded-xl' />
                </div>
            </div>
            <div className='pt-6 border-t border-gray-100 flex justify-end'>
                <Skeleton className='h-12 w-40 rounded-xl' />
            </div>
        </div>
    );
}
