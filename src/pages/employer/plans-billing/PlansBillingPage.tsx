import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Sparkles } from 'lucide-react';
import CurrentPlanCard from './components/CurrentPlanCard';
import NextInvoiceCard from './components/NextInvoiceCard';
import PlanBenefitsCard from './components/PlanBenefitsCard';
import InvoicesTable from './components/InvoicesTable';
import {
    useBillingOverviewData,
    useInvoicesData,
} from '../../../hooks/useBilling';

const ITEMS_PER_PAGE = 6;

export default function PlansBillingPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data: billingOverview, isLoading: isLoadingBilling } =
        useBillingOverviewData();
    const { data: invoicesData, isLoading: isLoadingInvoices } =
        useInvoicesData(ITEMS_PER_PAGE, offset);

    const handleUpdatePlan = () => {
        navigate('/employer/pricing');
    };

    const handleDownloadInvoice = (id: string) => {
        toast.info(`Downloading invoice ${id}... (Waiting for BE API)`);
    };

    if (isLoadingBilling || isLoadingInvoices) {
        return (
            <div className='w-full h-[60vh] flex items-center justify-center'>
                <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
            </div>
        );
    }
    const hasActivePlan =
        billingOverview &&
        billingOverview.planName &&
        !billingOverview.isCanceled;

    return (
        <div className='w-full max-w-360 mx-auto animate-in fade-in duration-500 pb-16'>
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

                <div className='xl:col-span-12 mt-4'>
                    <InvoicesTable
                        invoices={invoicesData?.content || []}
                        currentPage={currentPage}
                        totalPages={invoicesData?.totalPages || 1}
                        onPageChange={setCurrentPage}
                        onDownload={handleDownloadInvoice}
                    />
                </div>
            </div>
        </div>
    );
}
