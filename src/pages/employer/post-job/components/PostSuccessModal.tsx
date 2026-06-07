import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PromoteCard from './PromoteCard';

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
    const [selectedPromote, setSelectedPromote] = useState<string>('featured');
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <X size={20} />
                </button>

                <div className='p-8 border-b border-gray-100 flex flex-col items-center text-center'>
                    <div className='w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4'>
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className='text-xl font-bold text-gray-900 mb-2'>
                        Congratulation, Your Job is successfully posted!
                    </h2>
                    <button
                        onClick={() => navigate('/employer/my-jobs')}
                        className='flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline'
                    >
                        View Jobs <ArrowRight size={16} />
                    </button>
                </div>

                <div className='p-8 bg-gray-50/50'>
                    <div className='mb-6'>
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                            Promote Job: {jobTitle}
                        </h3>
                        <p className='text-sm text-gray-500'>
                            Increase your job visibility and attract top talent
                            by choosing a promotion plan.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <PromoteCard
                            id='featured'
                            type='featured'
                            title='Featured Your Job'
                            description='Your job will be displayed at the top of the search results for maximum exposure.'
                            isSelected={selectedPromote === 'featured'}
                            onSelect={setSelectedPromote}
                        />
                        <PromoteCard
                            id='highlight'
                            type='highlight'
                            title='Highlight Your Job'
                            description='Your job will be highlighted with a distinctive background to stand out from others.'
                            isSelected={selectedPromote === 'highlight'}
                            onSelect={setSelectedPromote}
                        />
                    </div>
                </div>

                <div className='p-6 flex items-center justify-between bg-white border-t border-gray-100'>
                    <button
                        onClick={() => navigate('/employer/dashboard')}
                        className='text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors'
                    >
                        Skip Now
                    </button>
                    <button
                        onClick={() => navigate('/employer/checkout')}
                        className='flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-all uppercase tracking-wide text-sm'
                    >
                        Promote Job <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
