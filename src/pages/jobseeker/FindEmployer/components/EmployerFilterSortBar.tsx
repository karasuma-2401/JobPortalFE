import { Grid, List } from "lucide-react";

interface Props {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  totalCount: number;
}

export default function EmployerFilterSortBar({ viewMode, setViewMode, totalCount }: Props) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-150 rounded-xl px-5 py-3.5 shadow-sm">
      
      <span className="text-sm text-gray-500">
        Showing <span className="font-bold text-gray-900">{totalCount}</span> employers
      </span>

      <div className="flex items-center gap-3">

        <select className="text-sm font-medium text-gray-700 outline-none cursor-pointer">
          <option>Latest</option>
          <option>Oldest</option>
        </select>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500"}`}
          >
            <List size={18} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500"}`}
          >
            <Grid size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}