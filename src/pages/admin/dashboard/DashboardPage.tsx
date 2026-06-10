import { useState, useEffect } from 'react';
import { DollarSign, Users, Briefcase, Building2 } from 'lucide-react';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import IndustryPieChart from './components/IndustryPieChart';
import PendingApprovalsList from './components/PendingApprovalsList';
import { AdminService, type AdminDashboardSummary } from '../../../services/adminService';

export default function DashboardPage() {
    const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSummary = async () => {
            try {
                const response = await AdminService.getDashboardSummary();
                setSummary(response);
            } catch (error) {
                console.error("Failed to load dashboard summary:", error);
            } finally {
                setLoading(false);
            }
        };
        loadSummary();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-gray-500 font-medium text-sm'>Loading dashboard summary...</p>
                </div>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
                <p className='text-red-500 font-medium'>Failed to load dashboard data. Please try again later.</p>
            </div>
        );
    }

    const formattedRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(summary.totalRevenue || 0);

    return (
        <div className='animate-in fade-in duration-500 pb-10'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-gray-900'>
                    Dashboard Overview
                </h1>
                <p className='text-sm text-gray-500 mt-1'>
                    Welcome back, Super Admin! Here's what's happening today.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
                <StatCard
                    title='Revenue'
                    value={formattedRevenue}
                    icon={<DollarSign size={24} />}
                    iconBgColor='bg-blue-50'
                    iconColor='text-blue-600'
                />
                <StatCard
                    title='Users'
                    value={summary.totalUsers.toLocaleString()}
                    icon={<Users size={24} />}
                    iconBgColor='bg-purple-50'
                    iconColor='text-purple-600'
                />
                <StatCard
                    title='Active Jobs'
                    value={summary.activeJobs.toLocaleString()}
                    icon={<Briefcase size={24} />}
                    iconBgColor='bg-green-50'
                    iconColor='text-green-600'
                />
                <StatCard
                    title='Pending Employers'
                    value={summary.pendingEmployers.toLocaleString()}
                    icon={<Building2 size={24} />}
                    iconBgColor='bg-orange-50'
                    iconColor='text-orange-600'
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2'>
                    <RevenueChart data={summary.monthlyRevenue || []} />
                </div>
                <div className='flex flex-col gap-6'>
                    <IndustryPieChart
                        data={summary.industryBreakdown || []}
                        totalJobs={summary.activeJobs}
                    />
                    <PendingApprovalsList employers={summary.pendingEmployersList || []} />
                </div>
            </div>
        </div>
    );
}

