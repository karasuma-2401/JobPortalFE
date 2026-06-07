import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Canceled';

interface StatusBadgeProps {
    status: PaymentStatus;
}
export default function StatusBadge({ status }: StatusBadgeProps) {
    switch (status) {
        case 'Completed':
            return (
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-e-full text-xs font-medium bg-green-50 text-green-700 border border-green-200'>
                    <CheckCircle2 size={14} /> Completed
                </span>
            );
        case 'Pending':
            return (
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-e-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200'>
                    <Clock size={14} /> Pending
                </span>
            );
        case 'Failed':
            return (
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-e-full text-xs font-medium bg-red-50 text-red-700 border border-red-200'>
                    <XCircle size={14} /> Failed
                </span>
            );
        case 'Canceled':
            return (
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-e-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200'>
                    <AlertCircle size={14} /> Canceled
                </span>
            );
        default:
            return null;
    }
}
