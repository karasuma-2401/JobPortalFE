import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ComboBox, { type OptionType } from '../../components/ui/ComboBox';
import GoogleLogo from '../../assets/GoogleLogo.svg';
import type { RegisterRequest } from '../../types/auth';
import { useRegister } from '../../hooks/useAuth';
import TermsModal from '../../components/TermsModal';

const accountTypes = [
    { label: 'Employers', value: 'EMPLOYER' },
    { label: 'Job Seekers', value: 'SEEKER' },
];

export default function Register() {
    const [role, setRole] = useState<OptionType>(accountTypes[0]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isAgreed, setIsAgreed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { mutate: registerUser, isPending } = useRegister();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please enter your email and password!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Confirm password does not match');
            return;
        }
        if (!isAgreed) {
            toast.error('You must agree to the Terms of services to register.');
            return;
        }

        const payload: RegisterRequest = {
            role: role.value as 'EMPLOYER' | 'SEEKER',
            email,
            password,
        };

        registerUser(payload);
    };

    return (
        <div className='w-full max-w-md mx-auto mt-10'>
            <div className='flex justify-between items-start mb-2'>
                <h1 className='text-3xl font-bold text-gray-900 '>
                    Create account
                </h1>
                <div className='relative'>
                    <ComboBox
                        options={accountTypes}
                        value={role}
                        onChange={(option) => setRole(option)}
                    />
                </div>
            </div>
            <p className='text-gray-500 mb-8'>
                Already have an account?{' '}
                <Link
                    to='/login'
                    className='text-blue-600 font-medium hover:underline'
                >
                    Log In
                </Link>
            </p>

            <form onSubmit={handleRegister} className='flex flex-col gap-5'>
                <Input
                    type='email'
                    placeholder='Email address'
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />
                <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
                <Input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                    }
                />
                <label className='flex items-start gap-2 cursor-pointer text-gray-600 -mt-1'>
                    <input
                        type='checkbox'
                        className='w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    <span className='text-sm'>
                        I've read and agree with your{' '}
                        <button
                            type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                setIsModalOpen(true);
                            }}
                            className='text-blue-600 font-medium hover:underline'
                        >
                            Terms of services
                        </button>
                    </span>
                </label>

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
                            Create Account <ArrowRight size={20} />
                        </>
                    )}
                </Button>
            </form>

            <div className='flex items-center gap-4 my-6 '>
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

            <TermsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
