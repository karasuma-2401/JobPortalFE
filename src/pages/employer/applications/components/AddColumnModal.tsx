import { X } from 'lucide-react';
import { useState } from 'react';

interface AddColumnModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
}

export default function AddColumnModal({
    isOpen,
    onClose,
    onAdd,
}: AddColumnModalProps) {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-[2px] animate-in fade-in duration-200'>
            <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <X size={20} />
                </button>

                <div className='p-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-6'>
                        Add New Column
                    </h2>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Column Name
                            </label>
                            <input
                                type='text'
                                placeholder='Enter column name...'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors'
                            />
                        </div>

                        <div className='flex items-center gap-3 pt-4'>
                            <button
                                onClick={onClose}
                                className='flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onAdd(name);
                                    setName('');
                                    onClose();
                                }}
                                className='flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200'
                            >
                                Add Column
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
