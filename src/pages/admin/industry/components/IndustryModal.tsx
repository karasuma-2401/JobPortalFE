import React, { useState } from 'react';
import { X, Briefcase } from 'lucide-react';
import { type Industry } from './types';

interface IndustryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    initialData?: Industry | null;
}

export default function IndustryModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: IndustryModalProps) {
    const [name, setName] = useState(initialData?.name || '');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
        }
    };

    const isEditMode = !!initialData;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
            <div
                className='absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200'
                onClick={onClose}
            ></div>
            
            <div className='relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                            <Briefcase size={20} />
                        </div>
                        <h2 className='text-lg font-bold text-gray-900'>
                            {isEditMode ? 'Edit Industry' : 'Add New Industry'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className='p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>
                            Industry Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='e.g. Information Technology'
                            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white shadow-sm'
                            autoFocus
                            required
                        />
                    </div>

                    <div className='flex items-center gap-3 justify-end'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={!name.trim()}
                            className='px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isEditMode ? 'Save Changes' : 'Create Industry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}