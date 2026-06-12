import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PaymentQRSection from './components/PaymentQRSection';
import OrderSummarySection from './components/OrderSummarySection';
import {
    useCreatePayment,
    usePaymentStatus,
    usePlans,
} from '../../../hooks/usePayment';

export default function CheckoutPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planId = searchParams.get('plan');

    const [transactionRef, setTransactionRef] = useState<string | null>(null);
    const isInitiated = useRef(false);
    const { data: plans, isLoading: isPlansLoading } = usePlans();

    const selectedPlan = plans?.find((p) => String(p.id) === planId);

    const { mutate: createPayment } = useCreatePayment();
    const { data: paymentData } = usePaymentStatus(transactionRef);

    useEffect(() => {
        if (!isInitiated.current && selectedPlan) {
            isInitiated.current = true;
            createPayment(
                {
                    cost: selectedPlan.price,
                    planName: selectedPlan.name,
                    note: 'Job Posting Plan Subscription',
                },
                {
                    onSuccess: (data) => {
                        setTransactionRef(data.transactionRef);
                    },
                    onError: () => {
                        toast.error('Failed to initialize payment gateway.');
                    },
                }
            );
        }
    }, [createPayment, selectedPlan]);

    const paymentStatus =
        paymentData?.status === 'COMPLETED' ? 'success' : 'pending';

    useEffect(() => {
        if (paymentStatus === 'success') {
            toast.success('Payment confirmed successfully!');
        }
    }, [paymentStatus]);

    const handleCancel = () => {
        navigate('/employer/post-job');
    };

    const handleSuccessRedirect = () => {
        navigate('/employer/post-job/create');
    };
    if (isPlansLoading || !selectedPlan) {
        return (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4'>
                <div className='bg-white p-8 rounded-2xl flex flex-col items-center shadow-xl'>
                    <Loader2 className='w-10 h-10 animate-spin text-blue-600 mb-4' />
                    <p className='font-medium text-gray-700'>
                        Loading checkout details...
                    </p>
                    <button
                        onClick={handleCancel}
                        className='mt-4 text-sm text-gray-500 hover:underline'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
            <div className='relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible animate-in zoom-in-95 duration-200'>
                <button
                    onClick={handleCancel}
                    className='absolute top-4 right-4 z-10 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors hidden lg:block'
                >
                    <X size={20} />
                </button>

                <PaymentQRSection
                    planPrice={selectedPlan.price}
                    paymentStatus={paymentStatus}
                />

                <OrderSummarySection
                    planTitle={selectedPlan.name}
                    planPrice={selectedPlan.price}
                    paymentStatus={paymentStatus}
                    onCancel={handleCancel}
                    onSuccessRedirect={handleSuccessRedirect}
                />
            </div>
        </div>
    );
}
