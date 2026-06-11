import { useMemo, useState } from 'react';

import { useAdminAuditLogs } from '../../../hooks/admin/useAdminAuditLogs';
import TablePagination from '../../../components/ui/TablePagination';
import AuditLogFilterBar from './components/AuditLogFilterBar';
import AuditLogTable from './components/AuditLogTable';
import LogDetailModal from './components/LogDetailModal';
import type {
    ActionType,
    AuditLog,
    EntityType,
} from './components/types';

const toAdminAuditActionType = (
    action: ActionType | 'All'
): 'All' | 'CREATE' | 'UPDATE' | 'DELETE' => {
    switch (action) {
        case 'All':
            return 'All';
        case 'Create':
        case 'Approve':
            return 'CREATE';
        case 'Update':
            return 'UPDATE';
        case 'Delete':
        case 'Reject':
            return 'DELETE';
        case 'Login':
            return 'All';
        default:
            return 'All';
    }
};

type AuditLogResponse = {
    id: number | string;
    createdAt: string;
    actionType: 'CREATE' | 'UPDATE' | 'DELETE';
    userId: number | string;
    userName?: string;
    data: string;
    // Flexible backend fields
    entityName?: string;
    recordId?: number | string;
};

type AuditLogItemLike = AuditLogResponse & {
    email?: string;
    entityType?: string;
    entityId?: number | string;
    ipAddress?: string;
};

export default function AuditLogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState<ActionType | 'All'>('All');
    const [entityFilter, setEntityFilter] = useState<EntityType | 'All'>('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, isLoading } = useAdminAuditLogs({
        searchQuery,
        actionType: toAdminAuditActionType(actionFilter),
        entityFilter,
        startDate,
        endDate,
        currentPage,
        itemsPerPage,
    });

    const logs: AuditLog[] = useMemo(() => {
        const items = (data?.items ?? []) as AuditLogItemLike[];

        return items.map((log) => {
            const action: ActionType =
                log.actionType === 'CREATE'
                    ? 'Create'
                    : log.actionType === 'UPDATE'
                      ? 'Update'
                      : 'Delete';

            const entityType = (log.entityName ?? log.entityType ?? 'System') as EntityType;
            const entityId = String(log.recordId ?? log.entityId ?? '');

            return {
                id: String(log.id),
                createdAt: log.createdAt,
                userId: String(log.userId),
                email: log.userName ?? log.email ?? 'N/A',
                action,
                entityType,
                entityId,
                ipAddress: log.ipAddress ?? 'N/A',
                description: log.data ? String(log.data) : '',
            };
        });
    }, [data]);

    const totalItems = data?.totalItems ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleToggleSelectAll = (checked: boolean) => {
        if (checked) setSelectedIds(logs.map((l) => l.id));
        else setSelectedIds([]);
    };

    const handleToggleSelectRow = (id: string, checked: boolean) => {
        if (checked) setSelectedIds((prev) => [...prev, id]);
        else setSelectedIds((prev) => prev.filter((item) => item !== id));
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
                    {/* Removed audit-log deletion actions */}
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

                {isLoading ? (
                    <div className='flex-1 flex items-center justify-center p-12'>
                        <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <AuditLogTable
                        logs={logs}
                        selectedIds={selectedIds}
                        onToggleSelectAll={handleToggleSelectAll}
                        onToggleSelectRow={handleToggleSelectRow}
                        onViewDetail={setSelectedLog}
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

            <LogDetailModal
                isOpen={!!selectedLog}
                onClose={() => setSelectedLog(null)}
                log={selectedLog}
            />
        </div>
    );
}

