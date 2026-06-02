import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomDropdownProps {
  icon?: React.ElementType;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({
  icon: Icon,
  value,
  options,
  onChange,
  placeholder = "Select...",
  className = "w-full",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="flex w-full items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-400" />}
          <span
            className={`font-medium ${!value ? "text-gray-400" : "text-gray-900"}`}
          >
            {selectedLabel}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={(e) => {
                e.preventDefault();
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === option.value
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
