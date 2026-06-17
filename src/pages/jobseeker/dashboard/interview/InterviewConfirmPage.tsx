// src/pages/jobseeker/dashboard/interview/InterviewConfirmPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarClock } from 'lucide-react';

export default function InterviewConfirmPage() {
    const { applicationId } = useParams<{ applicationId: string }>();
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isExpired] = useState<boolean>(() => {
        if (!applicationId) return false;
        const inviteTimestampStr = localStorage.getItem(`invite_${applicationId}`);
        if (!inviteTimestampStr) return false;
        
        const inviteTimestamp = parseInt(inviteTimestampStr, 10);
        return Date.now() - inviteTimestamp > 24 * 60 * 60 * 1000;
    });

    const handleConfirm = (): void => {
        if (!selectedTime) {
            toast.error("Please select a suitable date and time");
            return;
        }
        toast.success("Interview time confirmed successfully!");
    };

    if (isExpired) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center font-sans">
                <p className="text-xl font-semibold text-danger-500">
                    This invitation has expired.
                </p>
                <p className="text-gray-500 mt-2 text-sm max-w-sm">
                    The 24-hour response window for this interview request has passed. Please contact the employer directly.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white pb-16 font-sans flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <div className="p-4 bg-blue-50 text-primary-500 rounded-full mb-4">
                    <CalendarClock size={32} />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                    Select Interview Time
                </h2>
                <p className="text-gray-500 text-sm text-center mb-6">
                    Please pick a date and time that works best for you. The employer will be notified immediately.
                </p>

                <div className="w-full space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Choose Date & Time
                        </label>
                        <input 
                            type="datetime-local"
                            className="w-full p-3.5 border border-gray-200 rounded-xl font-medium text-gray-700 outline-none focus:border-primary-500 transition-colors"
                            value={selectedTime}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedTime(e.target.value)}
                        />
                    </div>

                    <button 
                        onClick={handleConfirm}
                        className="w-full bg-primary-500 text-white py-3.5 rounded-xl font-bold hover:bg-primary-600 transition-all text-[15px] shadow-sm shadow-primary-500/10"
                    >
                        Confirm Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}