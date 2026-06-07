import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    MoreVertical,
    CheckCircle2,
    XCircle,
    ArrowUpCircle,
    Eye,
    XSquare,
    Users, // Import thêm icon Users ở đây
} from 'lucide-react';
import Button from '../../../../components/ui/Button';

export interface Job {
    id: number;
    title: string;
    type: string;
    remaining: string;
    status: string;
    applications: number;
}

interface RecentJobsTableProps {
    jobs: Job[];
    onViewApplications: (jobId: number) => void;
    onPromote: (jobId: number) => void;
    onViewDetail: (jobId: number) => void;
    onMarkExpired: (jobId: number) => void;
}

export default function RecentJobsTable({
    jobs,
    onViewApplications,
    onPromote,
    onViewDetail,
    onMarkExpired,
}: RecentJobsTableProps) {
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                tableRef.current &&
                !tableRef.current.contains(event.target as Node)
            ) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='bg-white border border-gray-200 rounded-xl mt-8'>
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900'>
                    Recently Posted Jobs
                </h3>
                <Link
                    to='/employer/my-jobs'
                    className='text-sm font-medium text-gray-600 hover:text-primary-600 flex items-center gap-1 transition-colors'
                >
                    View all &rarr;
                </Link>
            </div>

            <div className='overflow-x-auto' ref={tableRef}>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                            <th className='px-6 py-4 rounded-tl-xl'>JOBS</th>
                            <th className='px-6 py-4'>STATUS</th>
                            <th className='px-6 py-4'>APPLICATIONS</th>
                            <th className='px-6 py-4 rounded-tr-xl'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {jobs.map((job) => (
                            <tr
                                key={job.id}
                                className='hover:bg-gray-50/50 transition-colors group'
                            >
                                <td className='px-6 py-4'>
                                    <p className='font-semibold text-gray-900 mb-1'>
                                        {job.title}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                        {job.type} &bull; {job.remaining}
                                    </p>
                                </td>

                                <td className='px-6 py-4'>
                                    {/* Bọc Border, Background và chỉnh bo góc cho Status Badge */}
                                    {job.status === 'Active' ? (
                                        <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-md border bg-success-50 border-success-200 text-sm font-medium text-success-700'>
                                            <CheckCircle2 size={16} />{' '}
                                            {job.status}
                                        </span>
                                    ) : (
                                        <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-md border bg-danger-50 border-danger-200 text-sm font-medium text-danger-700'>
                                            <XCircle size={16} /> {job.status}
                                        </span>
                                    )}
                                </td>

                                <td className='px-6 py-4'>
                                    <span className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                                        {/* Thay thế emoji bằng icon Users */}
                                        <Users
                                            size={18}
                                            className='text-gray-400'
                                        />{' '}
                                        {job.applications} Applications
                                    </span>
                                </td>

                                <td className='px-6 py-4'>
                                    <div className='flex items-center gap-3 relative'>
                                        <Button
                                            variant='social'
                                            className='bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 font-semibold'
                                            onClick={() =>
                                                onViewApplications(job.id)
                                            }
                                        >
                                            View Applications
                                        </Button>

                                        <button
                                            onClick={() =>
                                                setOpenDropdownId(
                                                    openDropdownId === job.id
                                                        ? null
                                                        : job.id
                                                )
                                            }
                                            className='p-2 text-gray-400 hover:bg-gray-100 rounded-md transition-colors'
                                        >
                                            <MoreVertical size={20} />
                                        </button>

                                        {openDropdownId === job.id && (
                                            <div className='absolute right-0 top-12 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95'>
                                                <button
                                                    onClick={() => {
                                                        onPromote(job.id);
                                                        setOpenDropdownId(null);
                                                    }}
                                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors'
                                                >
                                                    <ArrowUpCircle size={16} />{' '}
                                                    Promote Job
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        onViewDetail(job.id);
                                                        setOpenDropdownId(null);
                                                    }}
                                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors'
                                                >
                                                    <Eye size={16} /> View
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        onMarkExpired(job.id);
                                                        setOpenDropdownId(null);
                                                    }}
                                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-danger-50 hover:text-danger-600 transition-colors'
                                                >
                                                    <XSquare size={16} /> Mark
                                                    as expired
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
