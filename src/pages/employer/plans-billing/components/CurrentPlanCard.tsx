interface CurrentPlanCardProps {
    planName: string;
    description: string;
    onUpdatePlan: () => void;
}

export default function CurrentPlanCard({
    planName,
    description,
    onUpdatePlan,
}: CurrentPlanCardProps) {
    return (
        <div className='bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col h-full'>
            <h3 className='text-sm font-bold text-gray-900 mb-6'>
                Current Plan
            </h3>
            <div className='mb-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-3'>
                    {planName}
                </h2>
                <p className='text-sm text-gray-500 leading-relaxed'>
                    {description}
                </p>
            </div>
            <div className='flex items-center gap-4 mt-auto'>
                <button
                    onClick={onUpdatePlan}
                    className='px-6 py-2.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-md hover:bg-blue-600 hover:text-white transition-colors'
                >
                    Update Plan
                </button>
            </div>
        </div>
    );
}
