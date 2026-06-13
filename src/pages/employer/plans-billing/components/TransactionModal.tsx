import {
    X,
    Loader2,
    CheckCircle2,
    Clock,
    XCircle,
    CreditCard,
} from 'lucide-react';
import { useTransactionDetails } from '../../../../hooks/useBilling';

interface TransactionModalProps {
    transactionRef: string | null;
    onClose: () => void;
}

export default function TransactionModal({
    transactionRef,
    onClose,
}: TransactionModalProps) {
    const { data: transaction, isLoading } =
        useTransactionDetails(transactionRef);

    if (!transactionRef) return null;

    const renderStatus = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'COMPLETED':
            case 'SUCCESS':
            case 'CONFIRMED':
                return (
                    <span className='flex items-center gap-1.5 text-emerald-600 font-bold'>
                        <CheckCircle2 size={16} /> {status}
                    </span>
                );
            case 'PENDING':
                return (
                    <span className='flex items-center gap-1.5 text-amber-600 font-bold'>
                        <Clock size={16} /> {status}
                    </span>
                );
            case 'FAILED':
            case 'CANCELED':
                return (
                    <span className='flex items-center gap-1.5 text-red-600 font-bold'>
                        <XCircle size={16} /> {status}
                    </span>
                );
            default:
                return (
                    <span className='text-gray-600 font-bold'>{status}</span>
                );
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
            <div className='w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'>
                <div className='flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50'>
                    <h3 className='text-lg font-bold text-gray-900'>
                        Transaction Details
                    </h3>
                    <button
                        onClick={onClose}
                        className='p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className='p-6'>
                    {isLoading ? (
                        <div className='flex flex-col items-center justify-center py-12'>
                            <Loader2 className='w-8 h-8 animate-spin text-blue-600 mb-4' />
                            <p className='text-sm text-gray-500'>
                                Loading details...
                            </p>
                        </div>
                    ) : transaction ? (
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100'>
                                <div>
                                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                                        Amount
                                    </p>
                                    <p className='text-2xl font-black text-blue-600'>
                                        ${transaction.cost}.00
                                    </p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                                        Status
                                    </p>
                                    {renderStatus(transaction.status)}
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div>
                                    <p className='text-gray-500 mb-1'>
                                        Reference ID
                                    </p>
                                    <p className='font-semibold text-gray-900 truncate'>
                                        {transaction.transactionRef}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-gray-500 mb-1'>Date</p>
                                    <p className='font-semibold text-gray-900'>
                                        {new Date(
                                            transaction.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-gray-500 mb-1'>
                                        Plan Name
                                    </p>
                                    <p className='font-semibold text-gray-900'>
                                        {transaction.planName}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-gray-500 mb-1'>
                                        Payment Method
                                    </p>
                                    <p className='font-semibold text-gray-900 flex items-center gap-1.5'>
                                        <CreditCard
                                            size={14}
                                            className='text-gray-400'
                                        />{' '}
                                        {transaction.method}
                                    </p>
                                </div>
                                <div className='col-span-2'>
                                    <p className='text-gray-500 mb-1'>
                                        Employer Email
                                    </p>
                                    <p className='font-semibold text-gray-900'>
                                        {transaction.payerEmail}
                                    </p>
                                </div>
                            </div>

                            {/* Bank Details (Nếu có) */}
                            {transaction.accountNumber && (
                                <div className='mt-2 p-4 border border-blue-100 bg-blue-50/50 rounded-xl'>
                                    <h4 className='text-xs font-bold text-blue-800 uppercase tracking-wider mb-3'>
                                        Banking Info
                                    </h4>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>
                                                Bank (BIN):
                                            </span>
                                            <span className='font-semibold text-gray-900'>
                                                {transaction.bin}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>
                                                Account Name:
                                            </span>
                                            <span className='font-semibold text-gray-900'>
                                                {transaction.accountName}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>
                                                Account Number:
                                            </span>
                                            <span className='font-semibold text-gray-900'>
                                                {transaction.accountNumber}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className='text-center py-8 text-gray-500'>
                            Transaction not found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
