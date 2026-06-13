import {
    Eye,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    XCircle,
} from 'lucide-react';
import type { InvoiceItem } from '../../../../types/billing';

interface InvoicesTableProps {
    invoices: InvoiceItem[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onViewDetails: (id: string) => void;
}

export default function InvoicesTable({
    invoices,
    currentPage,
    totalPages,
    onPageChange,
    onViewDetails,
}: InvoicesTableProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const renderStatus = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'COMPLETED':
            case 'SUCCESS':
            case 'CONFIRMED':
                return (
                    <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider'>
                        <CheckCircle2 size={14} /> {status}
                    </span>
                );
            case 'PENDING':
                return (
                    <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-wider'>
                        <Clock size={14} /> {status}
                    </span>
                );
            case 'FAILED':
            case 'CANCELED':
                return (
                    <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wider'>
                        <XCircle size={14} /> {status}
                    </span>
                );
            default:
                return (
                    <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider'>
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className='bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col h-full'>
            <div className='p-6 border-b border-gray-100'>
                <h3 className='text-sm font-bold text-gray-900'>
                    Latest Invoices
                </h3>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100'>
                            <th className='px-6 py-4'>#ID</th>
                            <th className='px-6 py-4'>DATE</th>
                            <th className='px-6 py-4'>PLAN</th>
                            <th className='px-6 py-4'>STATUS</th>
                            <th className='px-6 py-4'>AMOUNT</th>
                            <th className='px-6 py-4 text-right'></th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {invoices.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className='px-6 py-8 text-center text-sm text-gray-500'
                                >
                                    No invoices found.
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className='hover:bg-blue-50/30 transition-colors group'
                                >
                                    <td className='px-6 py-4 text-sm font-bold text-gray-900'>
                                        {invoice.id}
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {invoice.date}
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-600'>
                                        {invoice.plan}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {renderStatus(invoice.status)}
                                    </td>
                                    <td className='px-6 py-4 text-sm font-bold text-gray-900'>
                                        {invoice.amount}
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button
                                            onClick={() =>
                                                onViewDetails(invoice.id)
                                            }
                                            title='View Details'
                                            className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-flex'
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className='p-6 border-t border-gray-100 flex items-center justify-center gap-2 mt-auto'>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || totalPages === 0}
                    className='w-8 h-8 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors'
                >
                    <ArrowLeft size={16} />
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                            currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {page.toString().padStart(2, '0')}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || totalPages === 0}
                    className='w-8 h-8 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors'
                >
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
