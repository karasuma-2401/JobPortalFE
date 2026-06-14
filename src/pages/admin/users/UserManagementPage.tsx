import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
    type UserProfile,
    type UserRole,
    type UserStatus,
} from './components/types';
import UserTable from './components/UserTable';
import UserFilterBar from './components/UserFilterBar';
import DeleteUserModal from './components/DeleteUserModal';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import TablePagination from '../../../components/ui/TablePagination';
import { AdminService } from '../../../services/adminService';

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'All'>('All');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(
        null
    );

    const [lockConfirm, setLockConfirm] = useState<{
        isOpen: boolean;
        user: UserProfile | null;
    }>({ isOpen: false, user: null });
    const [deleteConfirm, setDeleteConfirm] = useState<{
        isOpen: boolean;
        user: UserProfile | null;
    }>({ isOpen: false, user: null });

    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const roleParam = roleFilter === 'All' ? undefined : (roleFilter === 'Candidate' ? 'SEEKER' : 'EMPLOYER');
            const activeParam = statusFilter === 'All' ? undefined : (statusFilter === 'Active' ? true : false);
            
            const response = await AdminService.getUsers({
                search: searchQuery || undefined,
                role: roleParam,
                active: activeParam,
                offset: (currentPage - 1) * itemsPerPage,
                limit: itemsPerPage,
            });

            const mapped: UserProfile[] = response.items.map((user) => ({
                id: String(user.id),
                avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || '')}&background=random`,
                fullName: user.displayName || 'No Name',
                email: user.email,
                role: user.roles?.includes('EMPLOYER') ? 'Employer' : 'Candidate',
                createdAt: user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A',
                status: user.banned ? 'Locked' : 'Active',
            }));

            setUsers(mapped);
            setTotalItems(response.totalItems);
        } catch (error) {
            console.error('Failed to load users:', error);
            toast.error('Failed to load users list');
        } finally {
            setLoading(false);
        }
    }, [searchQuery, roleFilter, statusFilter, currentPage, itemsPerPage]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const executeStatusToggle = async () => {
        if (lockConfirm.user) {
            try {
                await AdminService.toggleUserLock(Number(lockConfirm.user.id));
                toast.success('User lock status updated successfully');
                loadUsers();
            } catch (err) {
                console.error(err);
                toast.error('Failed to toggle lock status');
            }
        }
        setLockConfirm({ isOpen: false, user: null });
    };

    const executeDelete = async (userId: string) => {
        try {
            await AdminService.deactivateUser(Number(userId));
            toast.success('User account deactivated successfully');
            loadUsers();
        } catch (err) {
            console.error(err);
            toast.error('Failed to deactivate user');
        }
        setDeleteConfirm({ isOpen: false, user: null });
    };

    return (
        <div className='animate-in fade-in duration-500 h-full flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        User Management
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Manage candidates and employer accounts
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden'>
                <UserFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={(query) => {
                        setSearchQuery(query);
                        setCurrentPage(1);
                    }}
                    roleFilter={roleFilter}
                    onRoleChange={(role) => {
                        setRoleFilter(role);
                        setCurrentPage(1);
                    }}
                    statusFilter={statusFilter}
                    onStatusChange={(status) => {
                        setStatusFilter(status);
                        setCurrentPage(1);
                    }}
                />

                {loading ? (
                    <div className='flex-1 flex items-center justify-center p-12'>
                        <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <UserTable
                        users={users}
                        activeDropdownId={activeDropdownId}
                        onToggleDropdown={setActiveDropdownId}
                        onToggleStatusClick={(user) =>
                            setLockConfirm({ isOpen: true, user })
                        }
                        onDeleteClick={(user) =>
                            setDeleteConfirm({ isOpen: true, user })
                        }
                    />
                )}

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
                    lockConfirm.user?.status === 'Active'
                        ? 'Lock User Account'
                        : 'Unlock User Account'
                }
                message={
                    lockConfirm.user?.status === 'Active'
                        ? `Are you sure you want to lock ${lockConfirm.user?.fullName}'s account? The user will not be able to log in.`
                        : `Are you sure you want to unlock ${lockConfirm.user?.fullName}'s account?`
                }
                onConfirm={executeStatusToggle}
                onCancel={() => setLockConfirm({ isOpen: false, user: null })}
                confirmText={
                    lockConfirm.user?.status === 'Active'
                        ? 'Lock Account'
                        : 'Unlock Account'
                }
                isDanger={lockConfirm.user?.status === 'Active'}
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

