import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentQRSectionProps {
    planPrice: number;
    paymentStatus: 'pending' | 'success';
    qrCodeString: string | null;
}

export default function PaymentQRSection({
    paymentStatus,
    qrCodeString,
}: PaymentQRSectionProps) {
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft <= 0 || paymentStatus === 'success') return;
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, paymentStatus]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='flex-1 flex flex-col items-center justify-center p-8 border-r border-gray-100'>
            <div className='w-full max-w-sm flex flex-col items-center'>
                <h3 className='text-lg font-bold text-gray-900 mb-2 text-center'>
                    Pay via QR Code
                </h3>
                <p className='text-sm text-gray-500 text-center mb-6'>
                    Use your Banking app or E-wallet to scan the QR code
                </p>

                <div className='relative w-64 h-64 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-center mb-6'>
                    {paymentStatus === 'success' ? (
                        <div className='absolute inset-0 bg-white/95 rounded-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-300'>
                            <CheckCircle2
                                size={56}
                                className='text-green-600 mb-3'
                            />
                            <p className='font-bold text-gray-900 text-lg text-center'>
                                Payment Successful!
                            </p>
                        </div>
                    ) : !qrCodeString ? (
                        <div className='flex flex-col items-center justify-center text-gray-400'>
                            <Loader2 size={32} className='animate-spin mb-2' />
                            <p className='text-xs font-medium'>
                                Generating QR...
                            </p>
                        </div>
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                            <QRCodeSVG
                                value={qrCodeString}
                                size={200}
                                level='M'
                                includeMargin={false}
                            />
                        </div>
                    )}
                </div>

                {paymentStatus === 'pending' && (
                    <div className='flex flex-col items-center gap-3'>
                        <div className='flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full'>
                            <Clock size={16} />
                            <span>Code expires in: {formatTime(timeLeft)}</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-500 mt-2'>
                            <Loader2
                                size={16}
                                className='animate-spin text-blue-600'
                            />
                            <span>Waiting for payment confirmation...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
