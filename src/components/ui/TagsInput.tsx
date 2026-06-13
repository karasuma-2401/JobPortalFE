import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagsInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export default function TagsInput({
    value,
    onChange,
    placeholder = 'Add tags...',
}: TagsInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = inputValue.trim();
            if (tag && !value.includes(tag)) {
                onChange([...value, tag]);
                setInputValue('');
            }
        }
    };

    const removeTag = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className='w-full'>
            <div className='flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className='flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-md font-medium'
                    >
                        {tag}
                        <button
                            type='button'
                            onClick={() => removeTag(index)}
                            className='hover:text-blue-900'
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
                <input
                    type='text'
                    className='flex-1 outline-none p-1 text-sm placeholder:text-gray-400'
                    placeholder={value.length === 0 ? placeholder : ''}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}
