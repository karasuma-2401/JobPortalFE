import { CalendarClock, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import ScheduleInterviewModal from '../applications/components/ScheduleInterviewModal';
import {
    useInterviewAction,
    useInterviewSessions,
    useRescheduleInterviewSession,
} from '../../../hooks/useInterviews';
import type {
    CreateInterviewSessionPayload,
    InterviewSession,
    InterviewSessionStatus,
} from '../../../types/interview';

const statuses: Array<{ label: string; value?: InterviewSessionStatus }> = [
    { label: 'All' },
    { label: 'Pending', value: 'PENDING_SELECTION' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Expired', value: 'EXPIRED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
];

const statusClass: Record<InterviewSessionStatus, string> = {
    PENDING_SELECTION: 'bg-orange-50 text-orange-700 border-orange-200',
    CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200',
    EXPIRED: 'bg-red-50 text-red-700 border-red-200',
    CANCELLED: 'bg-gray-50 text-gray-600 border-gray-200',
    COMPLETED: 'bg-green-50 text-green-700 border-green-200',
};

const formatDate = (value?: string) =>
    value
        ? new Date(value).toLocaleString([], {
              dateStyle: 'medium',
              timeStyle: 'short',
          })
        : 'Not selected';

export default function EmployerInterviewsPage() {
    const [status, setStatus] = useState<InterviewSessionStatus | undefined>();
    const [rescheduleTarget, setRescheduleTarget] =
        useState<InterviewSession | null>(null);
    const { data, isLoading } = useInterviewSessions(status);
    const cancelMutation = useInterviewAction('cancel');
    const completeMutation = useInterviewAction('complete');
    const rescheduleMutation = useRescheduleInterviewSession();

    const sessions = useMemo(() => data?.items ?? [], [data?.items]);

    const handleReschedule = (payload: CreateInterviewSessionPayload) => {
        if (!rescheduleTarget) return;
        rescheduleMutation.mutate(
            { id: rescheduleTarget.id, payload },
            { onSuccess: () => setRescheduleTarget(null) }
        );
    };

    return (
        <div className='space-y-6 animate-in fade-in duration-500'>
            <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                <div>
                    <h1 className='text-xl font-bold text-gray-900'>
                        Interview Sessions
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Track pending invitations, confirmed times, and
                        completed interviews.
                    </p>
                </div>
                <select
                    value={status ?? ''}
                    onChange={(e) =>
                        setStatus(
                            (e.target.value || undefined) as
                                | InterviewSessionStatus
                                | undefined
                        )
                    }
                    className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-primary-500'
                >
                    {statuses.map((item) => (
                        <option key={item.label} value={item.value ?? ''}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className='overflow-hidden rounded-xl border border-gray-100 bg-white'>
                <div className='grid grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500'>
                    <span>Candidate</span>
                    <span>Status</span>
                    <span>Selected slot</span>
                    <span>Deadline</span>
                    <span className='text-right'>Actions</span>
                </div>

                {isLoading ? (
                    <div className='p-8 text-center text-sm text-gray-500'>
                        Loading interviews...
                    </div>
                ) : sessions.length === 0 ? (
                    <div className='flex flex-col items-center justify-center gap-3 p-16 text-center'>
                        <div className='rounded-full bg-blue-50 p-4 text-primary-500'>
                            <CalendarClock size={30} />
                        </div>
                        <div>
                            <h3 className='font-bold text-gray-900'>
                                No interview sessions
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Move an application to Reviewing to create one.
                            </p>
                        </div>
                    </div>
                ) : (
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            className='grid grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] items-center border-b border-gray-50 px-5 py-4 text-sm last:border-0'
                        >
                            <div>
                                <p className='font-bold text-gray-900'>
                                    {session.jobSeekerName}
                                </p>
                                <p className='text-gray-500'>
                                    {session.jobPostTitle}
                                </p>
                            </div>
                            <span
                                className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass[session.status]}`}
                            >
                                {session.status.replace('_', ' ')}
                            </span>
                            <span className='text-gray-600'>
                                {formatDate(session.selectedSlot?.startsAt)}
                            </span>
                            <span className='text-gray-600'>
                                {formatDate(session.expiresAt)}
                            </span>
                            <div className='flex justify-end gap-2'>
                                {session.status === 'CONFIRMED' && (
                                    <>
                                        <button
                                            onClick={() =>
                                                completeMutation.mutate(
                                                    session.id
                                                )
                                            }
                                            className='rounded-lg bg-green-50 p-2 text-green-700 hover:bg-green-100'
                                            title='Complete'
                                        >
                                            <CheckCircle2 size={17} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setRescheduleTarget(session)
                                            }
                                            className='rounded-lg bg-blue-50 p-2 text-primary-600 hover:bg-blue-100'
                                            title='Reschedule'
                                        >
                                            <RefreshCw size={17} />
                                        </button>
                                    </>
                                )}
                                {(session.status === 'PENDING_SELECTION' ||
                                    session.status === 'CONFIRMED') && (
                                    <button
                                        onClick={() =>
                                            cancelMutation.mutate(session.id)
                                        }
                                        className='rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100'
                                        title='Cancel'
                                    >
                                        <XCircle size={17} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ScheduleInterviewModal
                isOpen={Boolean(rescheduleTarget)}
                applicationId={rescheduleTarget?.applicationId ?? null}
                candidateName={rescheduleTarget?.jobSeekerName}
                onClose={() => setRescheduleTarget(null)}
                onSubmit={handleReschedule}
                isSubmitting={rescheduleMutation.isPending}
            />
        </div>
    );
}
