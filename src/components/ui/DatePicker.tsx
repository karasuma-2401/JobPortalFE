import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, X } from "lucide-react";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}
interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholderText?: string;
  onClear?: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholderText, onClear }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-37.5 outline-none group"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Calendar size={16} className="text-gray-400 shrink-0" />
        <span
          className={`text-sm truncate ${
            value ? "text-gray-900 font-semibold" : "text-gray-400"
          }`}
        >
          {value || placeholderText}
        </span>
      </div>
      {value && onClear && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="p-0.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors ml-1 shrink-0"
          title="Clear date"
        >
          <X size={14} />
        </div>
      )}
    </button>
  ),
);
CustomInput.displayName = "CustomInput";

export default function CustomDatePicker({
  selected,
  onChange,
  placeholder = "Select date",
}: CustomDatePickerProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      customInput={
        <CustomInput
          placeholderText={placeholder}
          onClear={() => onChange(null)}
        />
      }
      dateFormat="yyyy-MM-dd"
      popperPlacement="bottom-start"
    />
  );
}
