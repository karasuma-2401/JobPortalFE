import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { JobseekerService } from '../../../../services/jobseekerService';
import type { Resume } from '../../../../types/jobseeker';

interface ApplyJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    onSubmit: (data: { resumeId: string; coverLetter: string }) => Promise<void>;
}

export default function ApplyJobModal({
    isOpen,
    onClose,
    jobTitle,
    onSubmit,
}: ApplyJobModalProps) {
    const [selectedResume, setSelectedResume] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoadingResumes, setIsLoadingResumes] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchResumes = async () => {
            if (!isOpen) {
                return;
            }

            setIsLoadingResumes(true);
            try {
                const response = await JobseekerService.getMyResumes();
                if (!isMounted) {
                    return;
                }
                setResumes(response);
                const defaultResume = response.find((resume) => resume.defaultResume);
                setSelectedResume(defaultResume?.id || response[0]?.id || '');
            } catch (error) {
                toast.error((error as Error).message || 'Failed to fetch resumes.');
            } finally {
                if (isMounted) {
                    setIsLoadingResumes(false);
                }
            }
        };

        void fetchResumes();

        return () => {
            isMounted = false;
            setSelectedResume('');
            setCoverLetter('');
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedResume) {
            toast.error('Please choose a resume first.');
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit({ resumeId: selectedResume, coverLetter });
            onClose();
        } catch (error) {
            toast.error((error as Error).message || 'Failed to submit application.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div
                className='absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity'
                onClick={onClose}
            />

            <div className='relative z-10 w-full max-w-xl animate-in rounded-2xl border border-gray-100 bg-white p-6 shadow-xl fade-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100'
                >
                    <X size={18} />
                </button>

                <h2 className='mb-6 pr-8 text-xl font-bold text-gray-900'>
                    Apply Job: {jobTitle}
                </h2>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='flex justify-between text-sm font-semibold text-gray-700'>
                            <span>Choose Resume</span>
                            {isLoadingResumes && (
                                <span className='flex items-center gap-1 text-blue-500'>
                                    <Loader2 size={14} className='animate-spin' />
                                    Loading...
                                </span>
                            )}
                        </label>
                        <select
                            value={selectedResume}
                            onChange={(event) => setSelectedResume(event.target.value)}
                            required
                            disabled={isLoadingResumes || resumes.length === 0}
                            className='w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50'
                        >
                            <option value='' disabled>
                                {isLoadingResumes
                                    ? 'Loading resumes...'
                                    : resumes.length === 0
                                      ? 'You do not have a resume yet'
                                      : 'Select a resume'}
                            </option>
                            {resumes.map((resume) => (
                                <option key={resume.id} value={resume.id}>
                                    {resume.fileName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>
                            Cover Letter
                        </label>
                        <textarea
                            value={coverLetter}
                            onChange={(event) => setCoverLetter(event.target.value)}
                            placeholder='Tell the employer why you are a strong fit.'
                            rows={6}
                            required
                            className='w-full resize-none rounded-lg border border-gray-200 p-4 text-[15px] text-gray-800 outline-none transition-colors focus:border-blue-500 placeholder:text-gray-400'
                        />
                    </div>

                    <div className='flex items-center justify-between pt-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='rounded-lg bg-blue-50 px-5 py-3 text-[15px] font-bold text-blue-600 transition-all hover:bg-blue-100 active:scale-[0.98]'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={
                                isSubmitting || !selectedResume || resumes.length === 0
                            }
                            className='flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-[15px] font-bold text-white shadow-md shadow-blue-600/10 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none'
                        >
                            {isSubmitting ? (
                                <Loader2 className='animate-spin' size={16} />
                            ) : (
                                <>
                                    <span>Apply Now</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
