import { CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInterviewSessions } from '../../../../hooks/useInterviews';
import type { InterviewSessionStatus } from '../../../../types/interview';

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

export default function InterviewsPage() {
    const navigate = useNavigate();
    const { data, isLoading } = useInterviewSessions();
    const sessions = data?.items ?? [];

    return (
        <div className='space-y-6 pb-8 text-left animate-in fade-in duration-500'>
            <div>
                <h1 className='text-[20px] font-bold text-gray-900'>
                    Interviews
                </h1>
                <p className='text-sm text-gray-500'>
                    Review invitations and confirmed interview times.
                </p>
            </div>

            <div className='overflow-hidden rounded-xl border border-gray-100 bg-white'>
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
                                No interviews yet
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Interview invitations from employers will appear here.
                            </p>
                        </div>
                    </div>
                ) : (
                    sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() =>
                                navigate(`/job-seeker/interviews/${session.id}`)
                            }
                            className='grid w-full grid-cols-[1.4fr_1fr_1fr_auto] items-center border-b border-gray-50 px-5 py-4 text-left text-sm transition-colors last:border-0 hover:bg-gray-50'
                        >
                            <div>
                                <p className='font-bold text-gray-900'>
                                    {session.jobPostTitle}
                                </p>
                                <p className='text-gray-500'>
                                    {session.employerName}
                                </p>
                            </div>
                            <span
                                className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass[session.status]}`}
                            >
                                {session.status.replace('_', ' ')}
                            </span>
                            <span className='text-gray-600'>
                                {formatDate(
                                    session.selectedSlot?.startsAt ||
                                        session.expiresAt
                                )}
                            </span>
                            <span className='font-bold text-primary-600'>
                                View
                            </span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
