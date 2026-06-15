import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PaymentQRSection from './components/PaymentQRSection';
import OrderSummarySection from './components/OrderSummarySection';
import {
    useCreateCheckout,
    useConfirmPayment,
    usePlans,
} from '../../../hooks/usePayment';
import type { PaymentResponse } from '../../../types/payment';

type CheckoutResponse = PaymentResponse & {
    qrCodeUrl?: string;
    qrImage?: string;
    paymentId?: number;
};

export default function CheckoutPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planId = searchParams.get('plan');

    const [paymentId, setPaymentId] = useState<number | null>(null);
    const [qrCodeString, setQrCodeString] = useState<string | null>(null);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const isInitiated = useRef(false);

    const { data: plans, isLoading: isPlansLoading } = usePlans();
    const selectedPlan = plans?.find((p) => String(p.id) === planId);

    const { mutate: createCheckout, isPending: isCreating } =
        useCreateCheckout();
    const { mutate: confirmPayment, isPending: isConfirming } =
        useConfirmPayment();

    const canConfirmPayment = Boolean(paymentId);

    useEffect(() => {
        if (!isInitiated.current && selectedPlan) {
            isInitiated.current = true;

            createCheckout(selectedPlan.id, {
                onSuccess: (data: CheckoutResponse) => {
                    const resolvedQrCode =
                        data.qrCode ||
                        data.checkoutUrl ||
                        data.qrCodeUrl ||
                        data.qrImage ||
                        null;
                    const resolvedPaymentId = data.id ?? data.paymentId ?? null;

                    if (!resolvedPaymentId) {
                        const message =
                            'Failed to initialize payment gateway. Payment identifier is missing.';
                        setCheckoutError(message);
                        return;
                    }

                    if (!resolvedQrCode) {
                        const message =
                            'Payment initialized, but QR image is unavailable. You can still confirm payment after transfer.';
                        setPaymentId(resolvedPaymentId);
                        setCheckoutError(message);
                        return;
                    }

                    setPaymentId(resolvedPaymentId);
                    setQrCodeString(resolvedQrCode);
                },
                onError: (error: unknown) => {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'Failed to initialize payment gateway.';
                    setCheckoutError(message);
                },
            });
        }
    }, [createCheckout, selectedPlan, navigate]);

    const handleCancel = () => {
        navigate('/employer/post-job');
    };

    const handleConfirmPaid = () => {
        if (!paymentId) return;
        confirmPayment(paymentId, {
            onSuccess: () => {
                toast.success('Admin has been notified!');
                navigate('/employer/payment-pending');
            },
            onError: () => {
                toast.error('Failed to notify admin. Please try again.');
            },
        });
    };

    if (isPlansLoading || !selectedPlan || isCreating) {
        return (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4'>
                <div className='bg-white p-8 rounded-2xl flex flex-col items-center shadow-xl'>
                    <Loader2 className='w-10 h-10 animate-spin text-blue-600 mb-4' />
                    <p className='font-medium text-gray-700'>
                        {isCreating
                            ? 'Generating QR Code...'
                            : 'Loading checkout details...'}
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
                    qrCodeString={qrCodeString}
                    error={checkoutError}
                />

                <OrderSummarySection
                    planTitle={selectedPlan.name}
                    planPrice={selectedPlan.price}
                    isConfirming={isConfirming}
                    isConfirmEnabled={canConfirmPayment}
                    onCancel={handleCancel}
                    onConfirmPaid={handleConfirmPaid}
                />
            </div>
        </div>
    );
}
