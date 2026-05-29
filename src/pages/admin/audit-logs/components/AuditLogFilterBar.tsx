import { Search, Activity, Database } from "lucide-react";
import CustomDropdown from "../../../../components/ui/DropDown";
import CustomDatePicker from "../../../../components/ui/DatePicker";
import { type ActionType, type EntityType } from "./types";

interface AuditLogFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  actionFilter: ActionType | "All";
  onActionChange: (val: ActionType | "All") => void;
  entityFilter: EntityType | "All";
  onEntityChange: (val: EntityType | "All") => void;
  startDate: string;
  onStartDateChange: (val: string) => void;
  endDate: string;
  onEndDateChange: (val: string) => void;
}

const ACTION_OPTIONS = [
  { label: "All Actions", value: "All" },
  { label: "Create", value: "Create" },
  { label: "Update", value: "Update" },
  { label: "Delete", value: "Delete" },
  { label: "Login", value: "Login" },
  { label: "Approve", value: "Approve" },
  { label: "Reject", value: "Reject" },
];

const ENTITY_OPTIONS = [
  { label: "All Entities", value: "All" },
  { label: "User", value: "User" },
  { label: "Employer Profile", value: "EmployerProfile" },
  { label: "Job Post", value: "JobPost" },
  { label: "Payment", value: "Payment" },
  { label: "System", value: "System" },
];

export default function AuditLogFilterBar({
  searchQuery,
  onSearchChange,
  actionFilter,
  onActionChange,
  entityFilter,
  onEntityChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: AuditLogFilterBarProps) {
  const parseDate = (dStr: string) => (dStr ? new Date(dStr) : null);
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="relative z-20 p-5 border-b border-gray-200 flex flex-col gap-4 shrink-0 bg-gray-50/50">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="relative w-full xl:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by User ID or Email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">
              From
            </span>
            <CustomDatePicker
              selected={parseDate(startDate)}
              onChange={(date) => onStartDateChange(formatDate(date))}
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">
              To
            </span>
            <CustomDatePicker
              selected={parseDate(endDate)}
              onChange={(date) => onEndDateChange(formatDate(date))}
              placeholder="YYYY-MM-DD"
            />
          </div>

          <CustomDropdown
            icon={Activity}
            value={actionFilter}
            options={ACTION_OPTIONS}
            onChange={(val) => onActionChange(val as ActionType | "All")}
          />
          <CustomDropdown
            icon={Database}
            value={entityFilter}
            options={ENTITY_OPTIONS}
            onChange={(val) => onEntityChange(val as EntityType | "All")}
          />
        </div>
      </div>
    </div>
  );
}
