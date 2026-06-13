import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import CurrentPlanCard from './components/CurrentPlanCard';
import NextInvoiceCard from './components/NextInvoiceCard';
import PlanBenefitsCard from './components/PlanBenefitsCard';
import InvoicesTable from './components/InvoicesTable';
import {
    useBillingOverviewData,
    useInvoicesData,
} from '../../../hooks/useBilling';
import PlansBillingSkeleton from './components/PlansBillingSkeleton';
import TransactionModal from './components/TransactionModal';

const ITEMS_PER_PAGE = 6;

export default function PlansBillingPage() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedTransactionRef, setSelectedTransactionRef] = useState<
        string | null
    >(null);

    const { data: billingOverview, isLoading: isLoadingBilling } =
        useBillingOverviewData();

    const { data: invoicesData, isLoading: isLoadingInvoices } =
        useInvoicesData(currentPage, ITEMS_PER_PAGE, startDate, endDate);

    const totalPages =
        Math.ceil((invoicesData?.totalItems || 0) / ITEMS_PER_PAGE) || 1;

    const handleUpdatePlan = () => {
        navigate('/employer/pricing');
    };

    const handleViewDetails = (id: string) => {
        setSelectedTransactionRef(id);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        setCurrentPage(1);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        setCurrentPage(1);
    };

    if (isLoadingBilling || isLoadingInvoices) {
        return <PlansBillingSkeleton />;
    }

    const hasActivePlan =
        billingOverview &&
        billingOverview.planName &&
        !billingOverview.isCanceled;

    return (
        <div className='w-full max-w-360 mx-auto animate-in fade-in duration-500 pb-16'>
            <TransactionModal
                transactionRef={selectedTransactionRef}
                onClose={() => setSelectedTransactionRef(null)}
            />
            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
                <div className='xl:col-span-4 flex flex-col gap-8'>
                    <div className='flex-1'>
                        <CurrentPlanCard
                            planName={
                                hasActivePlan
                                    ? billingOverview.planName
                                    : 'Free Plan'
                            }
                            description={
                                hasActivePlan
                                    ? billingOverview.description
                                    : 'You currently do not have any active premium plan. Upgrade to unlock all features.'
                            }
                            onUpdatePlan={handleUpdatePlan}
                        />
                    </div>
                    <div className='flex-1'>
                        {hasActivePlan ? (
                            <NextInvoiceCard
                                amount={billingOverview.amount || '$0.00'}
                                dueDate={billingOverview.dueDate || 'N/A'}
                                packageStarted={
                                    billingOverview.packageStarted || 'N/A'
                                }
                            />
                        ) : (
                            <div className='bg-linear-to-br from-blue-600 to-blue-800 rounded-xl p-6 shadow-sm flex flex-col h-full text-white relative overflow-hidden'>
                                <div className='absolute -top-10 -right-10 opacity-10'>
                                    <Sparkles size={120} />
                                </div>
                                <h3 className='text-sm font-bold text-blue-100 mb-6'>
                                    Unlock Premium
                                </h3>
                                <div className='mb-6 relative z-10'>
                                    <h2 className='text-2xl font-bold mb-2'>
                                        Find top talents faster
                                    </h2>
                                    <p className='text-sm text-blue-100/80 leading-relaxed'>
                                        Get unlimited resume access, priority
                                        job posting, and 24/7 dedicated support.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='xl:col-span-8 flex flex-col gap-8'>
                    <div className='flex-1'>
                        <PlanBenefitsCard
                            maxJobPosts={billingOverview?.maxJobPosts || 0}
                            activeJobsCount={
                                billingOverview?.activeJobsCount || 0
                            }
                            remainingJobPosts={
                                billingOverview?.remainingJobPosts || 0
                            }
                        />
                    </div>
                </div>

                <div className='xl:col-span-12 mt-4 flex flex-col gap-4'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                        <h2 className='text-lg font-bold text-gray-900'>
                            Billing History
                        </h2>
                        <div className='flex items-center gap-3 bg-white p-2 border border-gray-200 rounded-lg shadow-sm'>
                            <div className='flex items-center gap-2 px-2'>
                                <CalendarIcon
                                    size={16}
                                    className='text-gray-400'
                                />
                                <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                    Filter:
                                </span>
                            </div>
                            <input
                                type='date'
                                value={startDate}
                                onChange={handleStartDateChange}
                                className='text-sm border-none bg-gray-50 text-gray-700 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500'
                            />
                            <span className='text-gray-400'>-</span>
                            <input
                                type='date'
                                value={endDate}
                                onChange={handleEndDateChange}
                                className='text-sm border-none bg-gray-50 text-gray-700 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    <InvoicesTable
                        invoices={invoicesData?.items || []}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onViewDetails={handleViewDetails}
                    />
                </div>
            </div>
        </div>
    );
}
