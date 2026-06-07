import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface PromoteJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    onConfirm: (plan: string) => void;
}

export default function PromoteJobModal({
    isOpen,
    onClose,
    jobTitle,
    onConfirm,
}: PromoteJobModalProps) {
    const [selectedPlan, setSelectedPlan] = useState<'featured' | 'highlight'>(
        'featured'
    );

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <X size={20} />
                </button>

                <div className='p-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-3 pr-8'>
                        Promote Job: {jobTitle}
                    </h2>
                    <p className='text-sm text-gray-500 mb-8 leading-relaxed'>
                        Fusce commodo, sem non tempor convallis, sapien turpis
                        bibendum turpis, non pharetra nisl velit pulvinar
                        lectus. Suspendisse varius at nisl aliquam.
                    </p>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div
                            onClick={() => setSelectedPlan('featured')}
                            className={`flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedPlan === 'featured'
                                    ? 'border-blue-600 bg-blue-50/30'
                                    : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                        >
                            <p className='text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-4'>
                                Always on the top
                            </p>

                            <div className='w-full aspect-video border rounded-lg mb-6 p-4 flex flex-col gap-3 bg-white'>
                                <div className='flex gap-4 items-center'>
                                    <div className='w-12 h-8 bg-blue-600 rounded'></div>
                                    <div className='flex-1 flex flex-col gap-2'>
                                        <div className='w-full h-2 bg-gray-200 rounded'></div>
                                        <div className='w-2/3 h-2 bg-gray-200 rounded'></div>
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <div className='w-12 h-8 bg-gray-200 rounded'></div>
                                    <div className='flex-1 flex flex-col gap-2'>
                                        <div className='w-full h-2 bg-gray-200 rounded'></div>
                                        <div className='w-2/3 h-2 bg-gray-200 rounded'></div>
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <div className='w-12 h-8 bg-gray-200 rounded'></div>
                                    <div className='flex-1 flex flex-col gap-2'>
                                        <div className='w-full h-2 bg-gray-200 rounded'></div>
                                        <div className='w-2/3 h-2 bg-gray-200 rounded'></div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div
                                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        selectedPlan === 'featured'
                                            ? 'border-blue-600'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    {selectedPlan === 'featured' && (
                                        <div className='w-2.5 h-2.5 bg-blue-600 rounded-full' />
                                    )}
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Featured Your Job
                                    </h4>
                                    <p className='text-xs text-gray-500 leading-relaxed'>
                                        Sed neque diam, lacinia nec dolor et,
                                        euismod bibendum turpis. Sed feugiat
                                        fauc.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => setSelectedPlan('highlight')}
                            className={`flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedPlan === 'highlight'
                                    ? 'border-blue-600 bg-blue-50/30'
                                    : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                        >
                            <p className='text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-4'>
                                Highlight job with color
                            </p>

                            <div className='w-full aspect-video border rounded-lg mb-6 p-4 grid grid-cols-2 gap-3 bg-white'>
                                <div className='border border-gray-200 rounded p-2 flex flex-col justify-between'>
                                    <div className='w-full h-2 bg-gray-200 rounded mb-2'></div>
                                    <div className='w-full h-6 bg-gray-300 rounded'></div>
                                </div>
                                <div className='border-2 border-amber-400 bg-amber-50 rounded p-2 flex flex-col justify-between'>
                                    <div className='w-full h-2 bg-amber-200 rounded mb-2'></div>
                                    <div className='w-full h-6 bg-amber-400 rounded'></div>
                                </div>
                                <div className='border border-gray-200 rounded p-2 flex flex-col justify-between'>
                                    <div className='w-full h-2 bg-gray-200 rounded mb-2'></div>
                                    <div className='w-full h-6 bg-gray-100 rounded'></div>
                                </div>
                                <div className='border border-gray-200 rounded p-2 flex flex-col justify-between'>
                                    <div className='w-full h-2 bg-gray-200 rounded mb-2'></div>
                                    <div className='w-full h-6 bg-gray-100 rounded'></div>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div
                                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        selectedPlan === 'highlight'
                                            ? 'border-blue-600'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    {selectedPlan === 'highlight' && (
                                        <div className='w-2.5 h-2.5 bg-blue-600 rounded-full' />
                                    )}
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-1'>
                                        Highlight Your Job
                                    </h4>
                                    <p className='text-xs text-gray-500 leading-relaxed'>
                                        Sed neque diam, lacinia nec dolor et,
                                        euismod bibendum turpis. Sed feugiat
                                        fauc.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='px-8 py-6 flex items-center justify-between bg-white border-t border-gray-100'>
                    <button
                        onClick={onClose}
                        className='text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(selectedPlan)}
                        className='flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-all uppercase tracking-wide text-sm'
                    >
                        Promote Job <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
