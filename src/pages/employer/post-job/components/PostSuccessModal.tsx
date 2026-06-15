import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PostSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
}

export default function PostSuccessModal({
    isOpen,
    onClose,
    jobTitle,
}: PostSuccessModalProps) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <X size={20} />
                </button>

                <div className='p-8 flex flex-col items-center text-center'>
                    <div className='w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4'>
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className='text-xl font-bold text-gray-900 mb-2'>
                        Congratulation, Your Job is successfully posted!
                    </h2>
                    <p className='text-sm text-gray-500 mb-8'>
                        Your job's visibility (Highlights & Featured) has been
                        automatically applied based on your active plan.
                    </p>
                    <p className='text-gray-600 mb-6'>
                        Your job{' '}
                        <span className='font-semibold text-gray-900'>
                            "{jobTitle}"
                        </span>{' '}
                        has been published successfully.
                    </p>
                    <button
                        onClick={() => navigate('/employer/my-jobs')}
                        className='w-full flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-all uppercase tracking-wide text-sm'
                    >
                        View Jobs <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
