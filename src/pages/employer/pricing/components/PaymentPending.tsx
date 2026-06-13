import { useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import Button from '../../../../components/ui/Button';

export default function PaymentPending() {
    const navigate = useNavigate();

    return (
        <div className='w-full max-w-2xl mx-auto mt-20 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-5 duration-700 bg-white p-12 rounded-2xl shadow-sm border border-gray-100'>
            <div className='w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6 shadow-inner'>
                <Clock className='text-amber-500 w-12 h-12 animate-pulse' />
            </div>

            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                Payment Under Verification
            </h2>
            <p className='text-gray-600 mb-8 max-w-md leading-relaxed'>
                We have received your payment confirmation. Our admin team is
                currently verifying your transaction. This usually takes a few
                hours. We will notify you once your plan is activated.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
                <Button
                    variant='social'
                    onClick={() => navigate('/employer/post-job')}
                    className='flex items-center justify-center gap-2 py-3 px-6'
                >
                    <ArrowLeft size={18} /> Back to Pricing
                </Button>
                <Button
                    variant='primary'
                    onClick={() => navigate('/employer/dashboard')}
                    className='py-3 px-8'
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
}
