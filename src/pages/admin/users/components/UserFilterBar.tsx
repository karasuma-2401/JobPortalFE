import { Search, Filter, Shield } from "lucide-react";
import { type UserRole, type UserStatus } from "./types";

interface UserFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  roleFilter: UserRole | "All";
  onRoleChange: (role: UserRole | "All") => void;
  statusFilter: UserStatus | "All";
  onStatusChange: (status: UserStatus | "All") => void;
}

export default function UserFilterBar({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
}: UserFilterBarProps) {
  return (
    <div className="p-5 border-b border-gray-200 flex flex-col sm:*:flex-row sm:items-center justify-between gap-4 shrink-0 bg-gray-50/50">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Name or Email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 ">
          <Shield size={16} className="text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value as UserRole | "All")}
            className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
          >
            <option value="All">All roles</option>
            <option value="Candidate">Candidate</option>
            <option value="Employer">Employer</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white border-gray-300 rounded-lg px-3 py-2 ">
          <Filter size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as UserStatus | "All")
            }
            className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Locked">Locked</option>
          </select>
        </div>
      </div>
    </div>
  );
}
