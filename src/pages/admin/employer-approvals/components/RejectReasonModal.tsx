import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface RejectReasonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => void;
    companyName: string;
}

export default function RejectReasonModel({
    isOpen,
    onClose,
    onSubmit,
    companyName,
}: RejectReasonModalProps) {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;
    const handleSubmit = () => {
        if (!reason.trim()) return;
        onSubmit(reason);
        setReason('');
    };
    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
            <div
                className='absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200'
                onClick={onClose}
            ></div>
            <div className='relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors'
                >
                    <X size={20} />
                </button>
                <div className='flex items-start gap-4'>
                    <div className='p-3 rounded-full shrink-0 bg-red-100 text-red-600'>
                        <AlertCircle size={24} />
                    </div>
                    <div className='flex-1 mt-1'>
                        <h3 className='text-lg font-bold text-gray-900 mb-2'>
                            Reject Employer Profile
                        </h3>
                        <p className='text-sm text-gray-500 leading-relaxed mb-4'>
                            Please provide a reason for rejecting{' '}
                            <strong>{companyName}</strong>. This reason will be
                            sent to the employer via email.
                        </p>
                        <textarea
                            className='w-full h-32 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none mb-6'
                            placeholder='Enter rejection reason here...'
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        ></textarea>
                        <div className='flex items-center gap-3 justify-end'>
                            <button
                                onClick={onClose}
                                className='px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!reason.trim()}
                                className='px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled::cursor-not-allowed'
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
