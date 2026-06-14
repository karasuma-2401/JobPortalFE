import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-md transition-all duration-300 animate-in fade-in'>
            <div className='bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-slate-900/5 max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden transform transition-all animate-in zoom-in-[0.98] slide-in-from-bottom-4 duration-300'>
                <div className='px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <h3 className='text-xl font-bold text-slate-900 tracking-tight'>
                            Terms of Service
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        type='button'
                        className='text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-200'
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Nội dung */}
                <div className='p-6 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed max-h-[55vh] custom-scrollbar'>
                    <p className='text-base font-semibold text-slate-900'>
                        Welcome to MyJob!
                    </p>
                    <p>
                        These terms and conditions outline the rules and
                        regulations for the use of MyJob's Website. Please read
                        them carefully.
                    </p>

                    <div className='space-y-2'>
                        <h4 className='font-bold text-slate-900 text-base flex items-center gap-2'>
                            <span className='w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs'>
                                1
                            </span>
                            Acceptance of Terms
                        </h4>
                        <p className='pl-8'>
                            By accessing this website, we assume you accept
                            these terms and conditions in full. Do not continue
                            to use MyJob's website if you do not accept all of
                            the terms and conditions stated on this page.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <h4 className='font-bold text-slate-900 text-base flex items-center gap-2'>
                            <span className='w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs'>
                                2
                            </span>
                            User Account and Security
                        </h4>
                        <p className='pl-8'>
                            If you create an account on the Website, you are
                            responsible for maintaining the security of your
                            account and you are fully responsible for all
                            activities that occur under the account.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <h4 className='font-bold text-slate-900 text-base flex items-center gap-2'>
                            <span className='w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs'>
                                3
                            </span>
                            Privacy Policy
                        </h4>
                        <p className='pl-8'>
                            Your privacy is important to us. Please review our
                            Privacy Policy, which also governs your visit to
                            MyJob, to understand our practices.
                        </p>
                    </div>

                    <div className='pt-6 mt-4 border-t border-slate-100'>
                        <p className='text-xs text-slate-400 font-medium uppercase tracking-wider'>
                            Last updated: June 2026
                        </p>
                    </div>
                </div>
                <div className='px-6 py-4 border-t border-slate-100 bg-white flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]'>
                    <Button
                        type='button'
                        variant='primary'
                        className='px-6 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all'
                        onClick={onClose}
                    >
                        I Understand & Agree
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
