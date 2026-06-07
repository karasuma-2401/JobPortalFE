import { ArrowRight } from 'lucide-react';

interface NextInvoiceCardProps {
    amount: string;
    dueDate: string;
    packageStarted: string;
    onPayNow: () => void;
}
export default function NextInvoiceCard({
    amount,
    dueDate,
    packageStarted,
    onPayNow,
}: NextInvoiceCardProps) {
    return (
        <div className='bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col h-full'>
            <h3 className='text-sm font-bold text-gray-900 mb-6'>
                Next Invoices
            </h3>
            <div className='mb-6'>
                <h2 className='text-3xl font-bold text-blue-600 mb-2'>
                    {amount}
                </h2>
                <p className='text-bold text-gray-900 mb-1'>Due on {dueDate}</p>
                <p className='text-xs text-gray-500 mb-4'>
                    Package started on {packageStarted}
                </p>
                <p className='text-xs text-gray-500'>
                    You have to pay this amount of money every month
                </p>
            </div>
            <button
                onClick={onPayNow}
                className='w-full flex items-center justify-center gap-2 py-3 mt-auto bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100'
            >
                Pay Now <ArrowRight size={16} />
            </button>
        </div>
    );
}
