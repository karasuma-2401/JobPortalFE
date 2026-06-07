import { useState, useMemo } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
    type AuditLog,
    type ActionType,
    type EntityType,
} from './components/types';
import AuditLogFilterBar from './components/AuditLogFilterBar';
import LogDetailModal from './components/LogDetailModal';
import TablePagination from '../../../components/ui/TablePagination';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import AuditLogTable from './components/AuditLogTable';

const MOCK_LOGS: AuditLog[] = [
    {
        id: 'LOG-9001',
        createdAt: '2024-05-28 08:15',
        userId: 'U-01',
        email: 'admin@system.com',
        action: 'Approve',
        entityType: 'EmployerProfile',
        entityId: 'EMP-001',
        ipAddress: '192.168.1.1',
        description: JSON.stringify({
            previousStatus: 'Pending',
            newStatus: 'Approved',
            notes: 'Verified docs.',
        }),
    },
    {
        id: 'LOG-9002',
        createdAt: '2024-05-27 14:20',
        userId: 'U-02',
        email: 'hr@techvision.com',
        action: 'Create',
        entityType: 'JobPost',
        entityId: 'JOB-405',
        ipAddress: '14.22.105.11',
        description: JSON.stringify({
            title: 'Senior React Dev',
            salary: '$120k',
            type: 'Full-time',
        }),
    },
    {
        id: 'LOG-9003',
        createdAt: '2024-05-26 09:00',
        userId: 'U-03',
        email: 'candidate@gmail.com',
        action: 'Login',
        entityType: 'System',
        entityId: 'SYS',
        ipAddress: '103.11.2.99',
        description: 'User logged in successfully via Google OAuth.',
    },
    {
        id: 'LOG-9004',
        createdAt: '2024-04-15 16:45',
        userId: 'U-01',
        email: 'admin@system.com',
        action: 'Delete',
        entityType: 'User',
        entityId: 'U-999',
        ipAddress: '192.168.1.1',
        description: JSON.stringify({
            deletedEmail: 'spammer@bad.com',
            reason: 'Violated terms of service.',
        }),
    },
];
export default function AuditLogPage() {
    const [logs, setLogs] = useState<AuditLog[]>(MOCK_LOGS);

    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState<ActionType | 'All'>('All');
    const [entityFilter, setEntityFilter] = useState<EntityType | 'All'>('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [bulkDelete, setBulkDelete] = useState(false);
    const [clearOld, setClearOld] = useState(false);

    const filteredLogs = useMemo(() => {
        return logs.filter((log) => {
            const matchSearch =
                log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.userId.toLowerCase().includes(searchQuery.toLowerCase());
            const matchAction =
                actionFilter === 'All' || log.action === actionFilter;
            const matchEntity =
                entityFilter === 'All' || log.entityId === entityFilter;

            let matchDate = true;
            if (startDate && endDate) {
                const logDate = log.createdAt.split(' ')[0];
                matchDate = logDate >= startDate && logDate <= endDate;
            }
            return matchSearch && matchAction && matchEntity && matchDate;
        });
    }, [logs, searchQuery, actionFilter, entityFilter, startDate, endDate]);

    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredLogs.slice(start, start + itemsPerPage);
    }, [filteredLogs, currentPage, itemsPerPage]);

    const handleToggleSelectAll = (checked: boolean) => {
        if (checked) setSelectedIds(currentItems.map((log) => log.id));
        else setSelectedIds([]);
    };

    const handleToggleSelectRow = (id: string, checked: boolean) => {
        if (checked) setSelectedIds((prev) => [...prev, id]);
        else setSelectedIds((prev) => prev.filter((item) => item != null));
    };

    const executeBulkDelete = () => {
        setLogs((prev) => prev.filter((log) => !selectedIds.includes(log.id)));
        setSelectedIds([]);
        setBulkDelete(false);
        toast.success(`${selectedIds.length} logs deleted successfully.`);
    };

    const executeClearOldLogs = () => {
        setLogs((prev) =>
            prev.filter((log) => !log.createdAt.startsWith('2024-01'))
        );
        setClearOld(false);
        toast.success('Old logs cleared successfully');
    };

    return (
        <div className='animate-in fade-in duration-500 h-full flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Audit Logs
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Monitor system activities and security events
                    </p>
                </div>

                <div className='flex items-center gap-3'>
                    {selectedIds.length > 0 && (
                        <button
                            onClick={() => setBulkDelete(true)}
                            className='flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors animate-in slide-in-from-right-4'
                        >
                            <Trash2 size={16} /> Delete Selected (
                            {selectedIds.length})
                        </button>
                    )}
                    <button
                        onClick={() => setClearOld(true)}
                        className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
                    >
                        <AlertTriangle size={16} className='text-yellow-500' />{' '}
                        <p className='text-yellow-500'>Clear 30 Days</p>
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden'>
                <AuditLogFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    actionFilter={actionFilter}
                    onActionChange={setActionFilter}
                    entityFilter={entityFilter}
                    onEntityChange={setEntityFilter}
                    startDate={startDate}
                    onStartDateChange={setStartDate}
                    endDate={endDate}
                    onEndDateChange={setEndDate}
                />

                <AuditLogTable
                    logs={currentItems}
                    selectedIds={selectedIds}
                    onToggleSelectAll={handleToggleSelectAll}
                    onToggleSelectRow={handleToggleSelectRow}
                    onViewDetail={setSelectedLog}
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

            <LogDetailModal
                isOpen={!!selectedLog}
                onClose={() => setSelectedLog(null)}
                log={selectedLog}
            />

            <ConfirmModal
                isOpen={bulkDelete}
                title='Delete Selected Logs'
                message={`Are you sure you want to permanently delete ${selectedIds.length} selected log entries? This action cannot be undone.`}
                onConfirm={executeBulkDelete}
                onCancel={() => setBulkDelete(false)}
                confirmText='Delete Logs'
                isDanger={true}
            />

            <ConfirmModal
                isOpen={clearOld}
                title='Clear Old Logs'
                message='Are you sure you want to delete all audit logs older than 30 days? This will permanently erase historical tracking data.'
                onConfirm={executeClearOldLogs}
                onCancel={() => setClearOld(false)}
                confirmText='Clear Old Data'
                isDanger={true}
            />
        </div>
    );
}
