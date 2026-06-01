import { Search, Filter } from "lucide-react";
import { type PaymentStatus } from "./StatusBadge";
import CustomDropdown from "../../../../components/ui/DropDown";

interface PaymentFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: PaymentStatus | "All";
  onStatusChange: (status: PaymentStatus | "All") => void;
}

export default function PaymentFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: PaymentFilterBarProps) {
  const statusOption = [
    { label: "All", value: "All" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
    { label: "Canceled", value: "Canceled" },
  ];
  return (
    <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-gray-50/50">
      <div className="relative w-full sm:max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by User..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        />
      </div>

      <div className="flex items-center gap-3">
        <CustomDropdown
          icon={Filter}
          value={statusFilter}
          options={statusOption}
          onChange={(val) => onStatusChange(val as PaymentStatus | "All")}
        />
      </div>
    </div>
  );
}
