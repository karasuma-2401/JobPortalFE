import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  type UserProfile,
  type UserRole,
  type UserStatus,
} from "./components/types";
import UserTable from "./components/UserTable";
import UserFilterBar from "./components/UserFilterBar";
import DeleteUserModal from "./components/DeleteUserModal";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import TablePagination from "../../../components/ui/TablePagination";

const MOCK_USERS: UserProfile[] = [
  {
    id: "U-01",
    avatarUrl: "https://ui-avatars.com/api/?name=Alex+D",
    fullName: "Alex Doe",
    email: "alex@example.com",
    role: "Candidate",
    createdAt: "2024-03-01 09:00",
    status: "Active",
  },
  {
    id: "U-02",
    avatarUrl: "https://ui-avatars.com/api/?name=Tech+Vision",
    fullName: "TechVision HR",
    email: "hr@techvision.com",
    role: "Employer",
    createdAt: "2024-03-05 14:20",
    status: "Active",
  },
  {
    id: "U-03",
    avatarUrl: "https://ui-avatars.com/api/?name=Sarah+M",
    fullName: "Sarah Miller",
    email: "sarah.m@gmail.com",
    role: "Candidate",
    createdAt: "2024-03-10 11:15",
    status: "Locked",
  },
  {
    id: "U-04",
    avatarUrl: "https://ui-avatars.com/api/?name=Global+Sol",
    fullName: "Global Solutions",
    email: "admin@global.com",
    role: "Employer",
    createdAt: "2024-03-12 16:45",
    status: "Active",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const [lockConfirm, setLockConfirm] = useState<{
    isOpen: boolean;
    user: UserProfile | null;
  }>({ isOpen: false, user: null });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    user: UserProfile | null;
  }>({ isOpen: false, user: null });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const executeStatusToggle = () => {
    if (lockConfirm.user) {
      const newStatus =
        lockConfirm.user.status === "Active" ? "Locked" : "Active";
      setUsers((prev) =>
        prev.map((u) =>
          u.id === lockConfirm.user!.id ? { ...u, status: newStatus } : u,
        ),
      );
    }
    setLockConfirm({ isOpen: false, user: null });
  };
  const executeDelete = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    toast.success("User account deleted permanently");
    setDeleteConfirm({ isOpen: false, user: null });
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage candidates and employer accounts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <UserFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <UserTable
          users={currentItems}
          activeDropdownId={activeDropdownId}
          onToggleDropdown={setActiveDropdownId}
          onToggleStatusClick={(user) => setLockConfirm({ isOpen: true, user })}
          onDeleteClick={(user) => setDeleteConfirm({ isOpen: true, user })}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      </div>
      <ConfirmModal
        isOpen={lockConfirm.isOpen}
        title={
          lockConfirm.user?.status === "Active"
            ? "Lock User Account"
            : "Unlock User Account"
        }
        message={
          lockConfirm.user?.status === "Active"
            ? `Are you sure you want to lock ${lockConfirm.user?.fullName}'s account? The user will not be able to log in.`
            : `Are you sure you want to unlock ${lockConfirm.user?.fullName}'s account?`
        }
        onConfirm={executeStatusToggle}
        onCancel={() => setLockConfirm({ isOpen: false, user: null })}
        confirmText={
          lockConfirm.user?.status === "Active"
            ? "Lock Account"
            : "Unlock Account"
        }
        isDanger={lockConfirm.user?.status === "Active"}
      />
      <DeleteUserModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, user: null })}
        onConfirm={executeDelete}
        user={deleteConfirm.user}
      />
    </div>
  );
}
