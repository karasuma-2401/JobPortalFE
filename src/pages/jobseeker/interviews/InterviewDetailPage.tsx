import { ArrowLeft, CalendarCheck, Clock, Link as LinkIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useInterviewSession,
    useSelectInterviewSlot,
} from '../../../hooks/useInterviews';

const formatDate = (value?: string) =>
    value
        ? new Date(value).toLocaleString([], {
              dateStyle: 'full',
              timeStyle: 'short',
          })
        : '';

export default function InterviewDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const sessionId = id ? Number(id) : undefined;
    const { data: session, isLoading } = useInterviewSession(sessionId);
    const selectMutation = useSelectInterviewSlot();
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    const canSelect = session?.status === 'PENDING_SELECTION';
    const activeSlotId = useMemo(
        () => selectedSlotId ?? session?.selectedSlot?.id ?? null,
        [selectedSlotId, session?.selectedSlot?.id]
    );

    if (isLoading) {
        return (
            <div className='p-10 text-center text-sm text-gray-500'>
                Loading interview...
            </div>
        );
    }

    if (!session) {
        return (
            <div className='p-10 text-center font-semibold text-red-500'>
                Interview session not found.
            </div>
        );
    }

    return (
        <div className='mx-auto max-w-3xl space-y-6 py-4 text-left animate-in fade-in duration-500'>
            <button
                onClick={() => navigate(-1)}
                className='inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600'
            >
                <ArrowLeft size={17} />
                Back
            </button>

            <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
                <div className='mb-5 flex items-start justify-between gap-4'>
                    <div>
                        <h1 className='text-xl font-bold text-gray-900'>
                            {session.jobPostTitle}
                        </h1>
                        <p className='text-sm text-gray-500'>
                            {session.employerName}
                        </p>
                    </div>
                    <span className='rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700'>
                        {session.status.replace('_', ' ')}
                    </span>
                </div>

                {session.message && (
                    <p className='mb-5 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600'>
                        {session.message}
                    </p>
                )}

                <div className='mb-5 grid gap-3 sm:grid-cols-2'>
                    <div className='rounded-lg border border-gray-100 p-4'>
                        <div className='mb-1 flex items-center gap-2 text-sm font-bold text-gray-900'>
                            <Clock size={17} className='text-primary-500' />
                            Response deadline
                        </div>
                        <p className='text-sm text-gray-600'>
                            {formatDate(session.expiresAt)}
                        </p>
                    </div>
                    <div className='rounded-lg border border-gray-100 p-4'>
                        <div className='mb-1 flex items-center gap-2 text-sm font-bold text-gray-900'>
                            <LinkIcon size={17} className='text-primary-500' />
                            Meeting
                        </div>
                        <p className='text-sm text-gray-600'>
                            {session.meetingUrl || session.meetingLocation || 'Not provided'}
                        </p>
                    </div>
                </div>

                <div className='space-y-3'>
                    <h2 className='text-sm font-bold uppercase tracking-wide text-gray-500'>
                        Interview slots
                    </h2>
                    {session.slots.map((slot) => (
                        <label
                            key={slot.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                                activeSlotId === slot.id
                                    ? 'border-primary-500 bg-blue-50'
                                    : 'border-gray-100 hover:border-blue-200'
                            }`}
                        >
                            <input
                                type='radio'
                                disabled={!canSelect}
                                checked={activeSlotId === slot.id}
                                onChange={() => setSelectedSlotId(slot.id)}
                                className='h-4 w-4 text-primary-500'
                            />
                            <CalendarCheck
                                size={18}
                                className='text-primary-500'
                            />
                            <div>
                                <p className='font-semibold text-gray-900'>
                                    {formatDate(slot.startsAt)}
                                </p>
                                {slot.displayNote && (
                                    <p className='text-sm text-gray-500'>
                                        {slot.displayNote}
                                    </p>
                                )}
                            </div>
                        </label>
                    ))}
                </div>

                {canSelect && (
                    <div className='mt-6 flex justify-end'>
                        <button
                            disabled={!selectedSlotId || selectMutation.isPending}
                            onClick={() =>
                                selectedSlotId &&
                                sessionId &&
                                selectMutation.mutate({
                                    id: sessionId,
                                    slotId: selectedSlotId,
                                })
                            }
                            className='rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-600 disabled:opacity-60'
                        >
                            Confirm selected time
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
