import { Search, Filter, Shield } from 'lucide-react';
import { type UserRole, type UserStatus } from './types';
import CustomDropdown from '../../../../components/ui/DropDown';

interface UserFilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    roleFilter: UserRole | 'All';
    onRoleChange: (role: UserRole | 'All') => void;
    statusFilter: UserStatus | 'All';
    onStatusChange: (status: UserStatus | 'All') => void;
}

export default function UserFilterBar({
    searchQuery,
    onSearchChange,
    roleFilter,
    onRoleChange,
    statusFilter,
    onStatusChange,
}: UserFilterBarProps) {
    const roleOptions = [
        { label: 'All Roles', value: 'All' },
        { label: 'Candidate', value: 'Candidate' },
        { label: 'Employer', value: 'Employer' },
    ];

    const statusOptions = [
        { label: 'All Status', value: 'All' },
        { label: 'Active', value: 'Active' },
        { label: 'Locked', value: 'Locked' },
    ];

    return (
        <div className='p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-gray-50/50'>
            <div className='relative w-full sm:max-w-md'>
                <Search
                    size={18}
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <input
                    type='text'
                    placeholder='Search by Name or Email...'
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white shadow-sm'
                />
            </div>

            <div className='flex items-center gap-3'>
                <CustomDropdown
                    icon={Shield}
                    value={roleFilter}
                    options={roleOptions}
                    onChange={(val) => onRoleChange(val as UserRole | 'All')}
                />

                <CustomDropdown
                    icon={Filter}
                    value={statusFilter}
                    options={statusOptions}
                    onChange={(val) =>
                        onStatusChange(val as UserStatus | 'All')
                    }
                />
            </div>
        </div>
    );
}
