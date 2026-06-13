import { ArrowRight, Loader2 } from 'lucide-react';

interface OrderSummarySectionProps {
    planTitle: string;
    planPrice: number;
    isConfirming: boolean;
    onCancel: () => void;
    onConfirmPaid: () => void;
}

export default function OrderSummarySection({
    planTitle,
    planPrice,
    isConfirming,
    onCancel,
    onConfirmPaid,
}: OrderSummarySectionProps) {
    return (
        <div className='w-full lg:w-95 bg-gray-50 p-8 flex flex-col justify-between'>
            <div>
                <h3 className='text-lg font-bold text-gray-900 mb-6'>
                    Summary
                </h3>
                <div className='bg-white border border-gray-200 rounded-lg p-5 shadow-sm'>
                    <div className='flex items-center justify-between border-b border-gray-100 pb-4 mb-4'>
                        <div>
                            <p className='text-sm font-semibold text-gray-900'>
                                Pricing Plans
                            </p>
                            <p className='text-xs text-gray-500 mt-0.5 uppercase tracking-wider font-medium'>
                                {planTitle} Plan
                            </p>
                        </div>
                        <span className='font-bold text-gray-900'>
                            ${planPrice}.00
                        </span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='text-sm font-bold text-gray-900'>
                            Total:
                        </span>
                        <span className='text-xl font-extrabold text-blue-600'>
                            ${planPrice} USD
                        </span>
                    </div>
                </div>
            </div>

            <div className='mt-8 flex flex-col gap-3'>
                <button
                    onClick={onConfirmPaid}
                    disabled={isConfirming}
                    className='w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-200'
                >
                    {isConfirming ? (
                        <>
                            <Loader2 className='animate-spin' size={18} />{' '}
                            Verifying...
                        </>
                    ) : (
                        <>
                            I Have Paid <ArrowRight size={18} />
                        </>
                    )}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isConfirming}
                    className='w-full py-3 border border-gray-200 text-gray-600 bg-white rounded-md font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50'
                >
                    Cancel Transaction
                </button>
                <p className='text-xs text-center text-gray-400 leading-normal mt-2'>
                    Click "I Have Paid" only after you have successfully
                    transferred the money.
                </p>
            </div>
        </div>
    );
}
