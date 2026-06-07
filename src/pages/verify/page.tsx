import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle2,
    Loader2,
    MailCheck,
    RefreshCcw,
    XCircle,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useVerify } from '../../hooks/useAuth';
import type { ApiError } from '../../api/api';

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const { status, error, mutate } = useVerify();

    const handleRetry = () => {
        if (!token) {
            return;
        }

        mutate(token);
    };

    useEffect(() => {
        if (token) {
            mutate(token);
        }
    }, [token, mutate]);

    const renderContent = () => {
        if (!token) {
            return (
                <>
                    <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500'>
                        <XCircle size={32} />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                        Invalid verification link
                    </h1>
                    <p className='text-sm leading-6 text-gray-500 mb-8'>
                        This verification link is missing the required token.
                        Please return to registration and request a new email
                        verification link.
                    </p>
                    <div className='flex flex-col gap-3'>
                        <Link to='/register' className='w-full'>
                            <Button variant='primary' fullWidth>
                                Create Account <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <Link
                            to='/login'
                            className='inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:underline'
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </>
            );
        }

        if (status === 'pending') {
            return (
                <>
                    <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600'>
                        <Loader2 className='animate-spin' size={30} />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                        Verifying your email
                    </h1>
                    <p className='text-sm leading-6 text-gray-500'>
                        We&apos;re confirming your account now. This should only
                        take a moment.
                    </p>
                </>
            );
        }

        if (status === 'success') {
            return (
                <>
                    <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600'>
                        <CheckCircle2 size={32} />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                        Email verified successfully
                    </h1>
                    <p className='text-sm leading-6 text-gray-500 mb-8'>
                        Your account is now active and ready to use. Continue to
                        sign in and start exploring opportunities.
                    </p>
                    <Link to='/login' className='w-full'>
                        <Button variant='primary' fullWidth>
                            Go to Sign In <ArrowRight size={18} />
                        </Button>
                    </Link>
                </>
            );
        }

        if (status === 'error') {
            const apiError = error as ApiError | null;
            const errorMessage =
                apiError?.message ??
                'This link may have expired or has already been used. You can try again, or sign in if your account is already verified.';

            return (
                <>
                    <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600'>
                        <MailCheck size={32} />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                        Verification failed
                    </h1>
                    <p className='text-sm leading-6 text-gray-500 mb-8'>
                        {errorMessage}
                    </p>
                    <div className='flex flex-col gap-3'>
                        <Button
                            variant='primary'
                            fullWidth
                            onClick={handleRetry}
                            className='gap-2'
                        >
                            Try Again <RefreshCcw size={18} />
                        </Button>
                        <Link
                            to='/login'
                            className='inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:underline'
                        >
                            Go to Sign In
                        </Link>
                    </div>
                </>
            );
        }

        return null;
    };

    return (
        <div className='w-full max-w-md mx-auto mt-20'>
            <div className='rounded-2xl border border-gray-100 bg-white px-8 py-10 text-center shadow-sm'>
                {renderContent()}
            </div>
        </div>
    );
}
