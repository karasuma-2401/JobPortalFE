import { Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentQRSectionProps {
    qrCodeString: string | null;
}

export default function PaymentQRSection({
    qrCodeString,
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

                <div className='relative w-64 h-64 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-center mb-6'>
                    {!qrCodeString ? (
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
            </div>
        </div>
    );
}
