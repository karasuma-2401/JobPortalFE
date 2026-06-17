import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import type { CreateInterviewSessionPayload } from '../../../../types/interview';

interface ScheduleInterviewModalProps {
    isOpen: boolean;
    applicationId: number | null;
    candidateName?: string;
    onClose: () => void;
    onSubmit: (payload: CreateInterviewSessionPayload) => void;
    isSubmitting?: boolean;
}

interface SlotForm {
    startsAt: string;
    displayNote: string;
}

const emptySlot = (): SlotForm => ({
    startsAt: '',
    displayNote: '',
});

export default function ScheduleInterviewModal({
    isOpen,
    applicationId,
    candidateName,
    onClose,
    onSubmit,
    isSubmitting,
}: ScheduleInterviewModalProps) {
    const [message, setMessage] = useState('Please choose one interview time.');
    const [meetingLocation, setMeetingLocation] = useState('Google Meet');
    const [meetingUrl, setMeetingUrl] = useState('');
    const [slots, setSlots] = useState<SlotForm[]>([emptySlot()]);
    const [error, setError] = useState('');

    if (!isOpen || !applicationId) return null;

    const updateSlot = (index: number, key: keyof SlotForm, value: string) => {
        setSlots((current) =>
            current.map((slot, i) =>
                i === index ? { ...slot, [key]: value } : slot
            )
        );
    };

    const handleSubmit = () => {
        const validSlots = slots.filter((slot) => slot.startsAt);
        if (validSlots.length === 0) {
            setError('Add at least one interview time.');
            return;
        }
        if (validSlots.some((slot) => new Date(slot.startsAt) <= new Date())) {
            setError('All interview times must be in the future.');
            return;
        }
        setError('');
        onSubmit({
            applicationId,
            message,
            meetingLocation,
            meetingUrl,
            slots: validSlots.map((slot) => ({
                startsAt: slot.startsAt,
                displayNote: slot.displayNote || undefined,
            })),
        });
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4'>
            <div className='w-full max-w-2xl rounded-xl bg-white shadow-2xl'>
                <div className='flex items-center justify-between border-b border-gray-100 px-6 py-4'>
                    <div>
                        <h2 className='text-lg font-bold text-gray-900'>
                            Schedule interview
                        </h2>
                        <p className='text-sm text-gray-500'>
                            {candidateName || 'Candidate'} must choose within 24
                            hours.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className='rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className='space-y-5 px-6 py-5'>
                    <div>
                        <label className='mb-1 block text-sm font-semibold text-gray-700'>
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='min-h-[84px] w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                        />
                    </div>

                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div>
                            <label className='mb-1 block text-sm font-semibold text-gray-700'>
                                Location
                            </label>
                            <input
                                value={meetingLocation}
                                onChange={(e) =>
                                    setMeetingLocation(e.target.value)
                                }
                                className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                            />
                        </div>
                        <div>
                            <label className='mb-1 block text-sm font-semibold text-gray-700'>
                                Meeting link
                            </label>
                            <input
                                value={meetingUrl}
                                onChange={(e) => setMeetingUrl(e.target.value)}
                                placeholder='https://meet.google.com/...'
                                className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                            />
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-semibold text-gray-700'>
                                Proposed slots
                            </label>
                            <button
                                onClick={() =>
                                    setSlots((current) => [
                                        ...current,
                                        emptySlot(),
                                    ])
                                }
                                className='inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-primary-600 hover:bg-blue-100'
                            >
                                <Plus size={16} />
                                Add slot
                            </button>
                        </div>

                        {slots.map((slot, index) => (
                            <div
                                key={index}
                                className='grid gap-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3 sm:grid-cols-[1fr_1fr_auto]'
                            >
                                <input
                                    type='datetime-local'
                                    value={slot.startsAt}
                                    onChange={(e) =>
                                        updateSlot(
                                            index,
                                            'startsAt',
                                            e.target.value
                                        )
                                    }
                                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-500'
                                />
                                <input
                                    value={slot.displayNote}
                                    onChange={(e) =>
                                        updateSlot(
                                            index,
                                            'displayNote',
                                            e.target.value
                                        )
                                    }
                                    placeholder='Optional note'
                                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-500'
                                />
                                <button
                                    onClick={() =>
                                        setSlots((current) =>
                                            current.length === 1
                                                ? [emptySlot()]
                                                : current.filter(
                                                      (_, i) => i !== index
                                                  )
                                        )
                                    }
                                    className='rounded-lg p-2 text-red-500 hover:bg-red-50'
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className='rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600'>
                            {error}
                        </div>
                    )}
                </div>

                <div className='flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4'>
                    <button
                        onClick={onClose}
                        className='rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className='rounded-lg bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:bg-primary-600 disabled:opacity-60'
                    >
                        Send invitation
                    </button>
                </div>
            </div>
        </div>
    );
}
