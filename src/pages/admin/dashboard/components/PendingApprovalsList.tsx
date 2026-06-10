import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PendingEmployerItem {
    id: number;
    companyName: string;
    email: string;
    industry: string;
    createdAt: string;
}

interface PendingApprovalsListProps {
    employers: PendingEmployerItem[];
}

export default function PendingApprovalsList({ employers }: PendingApprovalsListProps) {
    const navigate = useNavigate();
    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full'>
            <div className='p-5 border-b border-gray-100 flex items-center justify-between'>
                <h3 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                    <Clock className='text-orange-500' size={20} />
                    Pending Approvals
                </h3>
                <button
                    onClick={() => navigate('/admin/employer-approvals')}
                    className='text-sm font-semibold text-blue-600 hover:text-blue-800'
                >
                    View All
                </button>
            </div>
            <div className='p-2 flex-1'>
                {employers.length === 0 ? (
                    <div className='p-6 text-center text-gray-500 text-sm'>
                        No pending approvals
                    </div>
                ) : (
                    employers.map((item) => (
                        <div
                            key={item.id}
                            className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group'
                        >
                            <div>
                                <p className='text-sm font-bold text-gray-900'>
                                    {item.companyName}
                                </p>
                                <p className='text-xs text-gray-500'>
                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Date N/A'}
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    navigate(`/admin/employer-approvals/${item.id}`)
                                }
                                className='p-2 text-gray-400 group-hover:text-blue-600 transition-colors'
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

