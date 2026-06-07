interface CurrentPlanCardProps {
    planName: string;
    description: string;
    onChangePlan: () => void;
    onCancelPlan: () => void;
}

export default function CurrentPlanCard({
    planName,
    description,
    onChangePlan,
    onCancelPlan,
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
                    onClick={onChangePlan}
                    className='px-6 py-2.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-md hover:bg-blue-600 hover:text-white transition-colors'
                >
                    Change Plans
                </button>
                <button
                    onClick={onCancelPlan}
                    className='px-6 py-2.5 text-gray-500 font-semibold text-sm rounded-md hover:bg-red-50 hover:text-red-600 transition-colors'
                >
                    Cancel Plan
                </button>
            </div>
        </div>
    );
}
