import { Edit3 } from 'lucide-react';

interface PaymentCardWidgetProps {
    cardHolder: string;
    expireDate: string;
    cardNumberMasked: string;
    onEdit: () => void;
}

export default function PaymentCardWidget({
    cardHolder,
    expireDate,
    cardNumberMasked,
    onEdit,
}: PaymentCardWidgetProps) {
    return (
        <div className='bg-white border border-gray-100 rounded-xl p-6 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='text-sm font-bold text-gray-900'>
                    Payment Card
                </h3>
                <button
                    onClick={onEdit}
                    className='flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors'
                >
                    <Edit3 size={14} /> Edit Card
                </button>
            </div>

            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-8 relative flex items-center'>
                        <div className='w-6 h-6 rounded-full bg-red-500 opacity-80 absolute left-0 mix-blend-multiply'></div>
                        <div className='w-6 h-6 rounded-full bg-yellow-400 opacity-80 absolute left-4 mix-blend-multiply'></div>
                    </div>
                    <div>
                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                            Name on card
                        </p>
                        <p className='text-sm font-bold text-gray-900'>
                            {cardHolder}
                        </p>
                    </div>
                </div>
                <div className='text-right'>
                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                        Expire date
                    </p>
                    <p className='text-sm font-bold text-gray-900'>
                        {expireDate}
                    </p>
                </div>
            </div>

            <div>
                <p className='text-lg font-bold text-gray-800 tracking-widest'>
                    {cardNumberMasked}
                </p>
            </div>
        </div>
    );
}
