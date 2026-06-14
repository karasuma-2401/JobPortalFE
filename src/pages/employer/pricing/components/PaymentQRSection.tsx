import { Loader2 } from 'lucide-react';

interface PaymentQRSectionProps {
    qrCodeString: string | null;
    error?: string | null;
}

export default function PaymentQRSection({
    qrCodeString,
    error,
}: PaymentQRSectionProps) {
    return (
        <div className='flex-1 flex flex-col items-center justify-center p-8 border-r border-gray-100'>
            <div className='w-full max-w-sm flex flex-col items-center'>
                <h3 className='text-lg font-bold text-gray-900 mb-2 text-center'>
                    Scan VietQR Code
                </h3>
                <p className='text-sm text-gray-500 text-center mb-6'>
                    Use your Banking app or E-wallet to scan the QR code and
                    complete the transfer.
                </p>

                <div className='relative w-64 h-64 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-center mb-6 overflow-hidden'>
                    {error ? (
                        <div className='flex flex-col items-center justify-center text-red-500 text-center px-4'>
                            <p className='text-sm font-semibold'>
                                Unable to load QR code
                            </p>
                            <p className='text-xs text-gray-500 mt-2'>
                                {error}
                            </p>
                        </div>
                    ) : !qrCodeString ? (
                        <div className='flex flex-col items-center justify-center text-gray-400'>
                            <Loader2 size={32} className='animate-spin mb-2' />
                            <p className='text-xs font-medium'>
                                Loading QR image...
                            </p>
                        </div>
                    ) : (
                        <img
                            src={qrCodeString}
                            alt='VietQR payment code'
                            className='w-full h-full object-contain'
                            loading='eager'
                            onError={(event) => {
                                const target = event.target as HTMLImageElement;
                                target.src = '';
                                target.alt = 'Unable to load QR image';
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
