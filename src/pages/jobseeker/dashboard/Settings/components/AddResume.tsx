import { useEffect, useState } from 'react';
import { FileText, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import type { ApiError } from '../../../../../api/api';
import Input from '../../../../../components/ui/Input';
import Button from '../../../../../components/ui/Button';

interface AddResumeProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: { fileName: string; file?: File | null }) => Promise<void>;
    editData?: { fileName: string } | null;
}

export default function AddResume({
    isOpen,
    onClose,
    onSave,
    editData,
}: AddResumeProps) {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFileName(editData?.fileName || '');
        setFile(null);
    }, [editData, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!fileName.trim()) {
            toast.error('Please enter your resume name.');
            return;
        }

        if (!editData && !file) {
            toast.error('Please upload a resume file.');
            return;
        }

        try {
            setIsLoading(true);
            await onSave({ fileName, file });
            onClose();
        } catch (error) {
            toast.error((error as ApiError).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in'>
            <div className='relative mx-4 w-full max-w-[640px] rounded-xl bg-bg-white p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.15)]'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-bg-white text-gray-500 shadow-md transition-colors hover:bg-gray-50'
                >
                    <X size={20} />
                </button>

                <h2 className='mb-6 text-lg font-bold text-gray-900'>
                    {editData ? 'Rename Cv/Resume' : 'Add Cv/Resume'}
                </h2>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <Input
                        label='Cv/Resume Name'
                        type='text'
                        placeholder='Your resume name...'
                        value={fileName}
                        onChange={(event) => setFileName(event.target.value)}
                    />

                    {!editData && (
                        <label className='flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/10 p-8 text-center transition-colors hover:bg-primary-50/10'>
                            <div className='mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gray-50 bg-gray-50 shadow-sm'>
                                {file ? (
                                    <FileText className='h-6 w-6 text-primary-500' />
                                ) : (
                                    <Upload className='h-6 w-6 text-gray-400' />
                                )}
                            </div>
                            <p className='text-sm font-medium text-gray-900'>
                                {file ? file.name : 'Browse File or drop here'}
                            </p>
                            <p className='mt-1.5 text-xs text-gray-400'>
                                PDF, DOC, and DOCX are supported.
                            </p>
                            <input
                                type='file'
                                accept='.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                className='hidden'
                                onChange={(event) =>
                                    setFile(event.target.files?.[0] ?? null)
                                }
                            />
                        </label>
                    )}

                    <div className='flex items-center justify-between gap-4 pt-2'>
                        <Button
                            type='button'
                            variant='social'
                            className='border-none px-6 font-semibold text-primary-500 !bg-primary-50/40 hover:!bg-primary-50'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant='primary'
                            className='min-w-[160px] px-6'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className='mx-auto animate-spin' size={20} />
                            ) : editData ? (
                                'Rename Resume'
                            ) : (
                                'Add Cv/Resume'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
