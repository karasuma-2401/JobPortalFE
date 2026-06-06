import { ChevronDown, LayoutGrid, List } from "lucide-react";

interface FilterSortBarProps {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
}

export default function FilterSortBar({ viewMode, setViewMode }: FilterSortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-5 gap-4">
      
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Khu vực chứa các badge lọc bổ sung (nếu có) */}
      </div>

      <div className="flex items-center gap-4 text-[14px] text-gray-600 flex-wrap w-full sm:w-auto justify-end">
        <div className="flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 cursor-pointer bg-white hover:border-gray-200 transition-colors">
          <span className="text-gray-400">Sort by:</span>
          <span className="font-medium text-gray-800">Latest</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 cursor-pointer bg-white hover:border-gray-200 transition-colors">
          <span className="font-medium text-gray-800">12 per page</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
          {/* SỬA TẠI ĐÂY: Thêm onClick cho nút Grid View */}
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary-50 text-primary-500" : "text-gray-400 hover:text-gray-600"}`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          
          <div className="w-[1px] h-5 bg-gray-100" />
          
          <button 
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