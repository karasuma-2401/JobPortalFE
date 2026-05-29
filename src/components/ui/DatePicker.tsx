import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholderText?: string;
}
const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholderText }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-35 text-left outline-none"
    >
      <Calendar size={16} className="text-gray-400 shrink-0" />
      <span
        className={`text-sm flex-1 truncate ${
          value ? "text-gray-900 font-semibold" : "text-gray-400"
        }`}
      >
        {value || placeholderText}
      </span>
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
      customInput={<CustomInput placeholderText={placeholder} />}
      dateFormat="yyyy-MM-dd"
      popperPlacement="bottom-start"
    />
  );
}
