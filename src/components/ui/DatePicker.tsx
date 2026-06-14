import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, X } from 'lucide-react';

interface CustomDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    className?: string;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
    placeholderText?: string;
    onClear?: () => void;
    className?: string;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick, placeholderText, onClear, className = '' }, ref) => (
        <div
            role='button'
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onClick?.();
                }
            }}
            ref={ref}
            className={`
        flex items-center justify-between
        w-full
        bg-white
        border border-gray-100
        rounded-md
        px-4 py-3
        text-left
        hover:border-primary-500
        focus:outline-none
        focus:ring-2
        focus:ring-primary-500
        transition-all
        ${className}
      `}
        >
            <div className='flex items-center gap-2 overflow-hidden'>
                <Calendar size={18} className='text-gray-400 shrink-0' />

                <span
                    className={`truncate text-sm ${
                        value ? 'text-gray-900 font-medium' : 'text-gray-400'
                    }`}
                >
                    {value || placeholderText}
                </span>
            </div>

            {value && onClear && (
                <button
                    type='button'
                    onClick={(e) => {
                        e.stopPropagation();
                        onClear();
                    }}
                    className='
            p-1
            rounded-full
            text-gray-400
            hover:text-red-500
            hover:bg-gray-100
            transition-colors
          '
                    aria-label='Clear date'
                >
                    <X size={16} />
                </button>
            )}
        </div>
    )
);

CustomInput.displayName = 'CustomInput';

export default function CustomDatePicker({
    selected,
    onChange,
    placeholder = 'dd/mm/yyyy',
    className = '',
}: CustomDatePickerProps) {
    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            dateFormat='dd/MM/yyyy'
            popperPlacement='bottom-start'
            customInput={
                <CustomInput
                    placeholderText={placeholder}
                    onClear={() => onChange(null)}
                    className={className}
                />
            }
        />
    );
}
