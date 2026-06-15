import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SORT_OPTIONS } from "../../../../utils/filterOptions.ts";
interface FilterSortBarProps {
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
  sortBy: string; // Trạng thái sort hiện tại
  onSortChange: (value: string) => void; // Hàm callback khi thay đổi kiểu sort
}

export default function FilterSortBar({ 
  viewMode, 
  setViewMode, 
  sortBy, 
  onSortChange 
}: FilterSortBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lấy label của option đang được chọn để hiển thị lên UI
  const currentLabel = SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || "Latest";

  // Đóng dropdown khi click ra ngoài vùng hiển thị
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-5 gap-4 select-none">
      
      {/* Vùng trống bên trái nếu bạn muốn bổ sung ô Search hoặc Filter Badge sau này */}
      <div className="flex items-center gap-2.5 flex-wrap"></div>

      {/* Khu vực điều khiển Sort & View Mode */}
      <div className="flex items-center gap-4 text-[14px] text-gray-600 flex-wrap w-full sm:w-auto justify-end">
        
        {/* Dropdown Sort động */}
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 cursor-pointer bg-white hover:border-gray-200 transition-colors"
          >
            <span className="text-gray-400">Sort by:</span>
            <span className="font-medium text-gray-800">{currentLabel}</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </div>

          {/* Menu Dropdown đổ xuống */}
          {isOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-[13px] ${
                    sortBy === option.value ? "text-primary-500 font-semibold bg-primary-50/40" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Đã loại bỏ hoàn toàn khối chọn số lượng item "12 per page" */}

        {/* Nút chuyển đổi giao diện Gird / List */}
        <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
          <button 
            type="button"
            onClick={() => setViewMode("grid")} // Thêm onClick động bị thiếu
            className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary-50 text-primary-500" : "text-gray-400 hover:text-gray-600"}`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          
          <div className="w-[1px] h-5 bg-gray-100" />
          
          <button 
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary-50 text-primary-500" : "text-gray-400 hover:text-gray-600"}`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}