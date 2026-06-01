import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export default function TablePagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: TablePaginationProps) {
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

  const options = [10, 20, 50];

  return (
    <div className="p-5 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show</span>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white hover:border-blue-500 transition-colors w-17 outline-none shadow-sm"
          >
            <span className="font-medium text-gray-900">{itemsPerPage}</span>
            <ChevronDown
              size={14}
              className={`text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-100">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onItemsPerPageChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                    itemsPerPage === opt
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <span>entries</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600 px-2">
          Page <span className="font-bold text-gray-900">{currentPage}</span> of{" "}
          {Math.max(1, totalPages)}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
