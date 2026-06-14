import { Loader2, X, CheckCircle2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { EmployerService } from '../../../../services/employerService';

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    candidateId: string;
    candidateName: string;
}

export default function InviteModal({
    isOpen,
    onClose,
    candidateId,
    candidateName,
}: InviteModalProps) {
    const { data: jobData, isLoading: isLoadingJobs } = useQuery({
        queryKey: ['employerInviteJobs'],
        queryFn: () =>
            EmployerService.getEmployerJobPosts({
                limit: 100,
                offset: 0,
            }),
        enabled: isOpen,
        staleTime: 60 * 1000,
    });

    const inviteMutation = useMutation({
        mutationFn: (jobPostId: number) =>
            EmployerService.inviteCandidate({
                jobSeekerId: Number(candidateId),
                jobPostId,
            }),
        onSuccess: (_response, jobPostId) => {
            const job = activeJobs.find((item) => Number(item.id) === jobPostId);
            toast.success(
                `Invitation sent to ${candidateName}${job ? ` for ${job.title}` : ''}.`
            );
            onClose();
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to send invitation email.');
        },
    });

    if (!isOpen) return null;

    const activeJobs = (jobData?.items || []).filter((job) =>
        ['OPEN', 'ACTIVE', 'Active'].includes(String(job.status))
    );

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl animate-in zoom-in-95 duration-200'>
                <div className='flex items-center justify-between p-5 border-b border-gray-100'>
                    <h3 className='font-bold text-gray-900'>
                        Invite {candidateName}
                    </h3>
                    <button
                        onClick={onClose}
                        className='p-1 text-gray-400 hover:bg-gray-100 rounded-full'
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className='p-5'>
                    <p className='text-sm text-gray-600 mb-4'>
                        Select an active job to invite this candidate to apply:
                    </p>
                    {isLoadingJobs ? (
                        <div className='flex items-center justify-center gap-2 py-6 text-sm text-gray-500'>
                            <Loader2 size={18} className='animate-spin' />
                            Loading active jobs...
                        </div>
                    ) : activeJobs.length === 0 ? (
                        <div className='py-6 text-center text-sm text-gray-500'>
                            No active jobs available.
                        </div>
                    ) : (
                        <div className='space-y-3'>
                        {activeJobs.map((job) => (
                            <button
                                key={job.id}
                                disabled={inviteMutation.isPending}
                                onClick={() => {
                                    inviteMutation.mutate(Number(job.id));
                                }}
                                className='w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left disabled:opacity-60 disabled:cursor-not-allowed'
                            >
                                <span className='font-medium text-gray-700 group-hover:text-blue-700'>
                                    {job.title}
                                </span>
                                {inviteMutation.isPending ? (
                                    <Loader2
                                        size={18}
                                        className='text-blue-500 animate-spin'
                                    />
                                ) : (
                                    <CheckCircle2
                                        size={18}
                                        className='text-gray-300 group-hover:text-blue-500'
                                    />
                                )}
                            </button>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
