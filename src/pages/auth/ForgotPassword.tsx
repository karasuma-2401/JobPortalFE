import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRequestPasswordReset } from '../../hooks/useAuth';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GoogleLogo from '../../assets/GoogleLogo.svg';
import { handleEnterToNext } from '../../utils/formUtils';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const {
        mutate: requestReset,
        isPending,
        isSuccess,
    } = useRequestPasswordReset();

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email!');
            return;
        }
        requestReset(email);
    };

    return (
        <div className='w-full max-w-md mx-auto mt-20'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                    Forgot Password
                </h1>
                <div className='flex flex-col gap-1 text-sm text-gray-500'>
                    <p>
                        Go back to{' '}
                        <Link
                            to='/login'
                            className='text-blue-600 font-medium hover:underline'
                        >
                            Sign In
                        </Link>
                    </p>
                    <p>
                        Don't have an account?{' '}
                        <Link
                            to='/register'
                            className='text-blue-600 font-medium hover:underline'
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {isSuccess ? (
                <div className='bg-green-50 p-4 rounded-lg border border-green-100 text-center'>
                    <p className='text-green-800 font-medium mb-4'>
                        Reset link sent to {email}
                    </p>
                    <Link to='/login'>
                        <Button variant='primary' fullWidth>
                            Return to Login
                        </Button>
                    </Link>
                </div>
            ) : (
                <form
                    onKeyDown={handleEnterToNext}
                    onSubmit={handleForgotPassword}
                    className='flex flex-col gap-5'
                >
                    <Input
                        type='email'
                        placeholder='Email address'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <Button
                        variant='primary'
                        fullWidth
                        className='mt-2 flex items-center justify-center gap-2'
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className='animate-spin' size={20} />
                        ) : (
                            <>
                                Reset Password <ArrowRight size={20} />
                            </>
                        )}
                    </Button>
                </form>
            )}

            <div className='flex items-center gap-4 my-6'>
                <div className='flex-1 h-px bg-gray-100'></div>
                <span className='text-gray-400 text-sm'>or</span>
                <div className='flex-1 h-px bg-gray-100'></div>
            </div>

            <div className='flex gap-4'>
                <Button variant='social' fullWidth>
                    <img src={GoogleLogo} alt='Google logo' />
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}
