// src/pages/jobseeker/dashboard/interview/components/JobReviewForm.tsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface JobReviewFormProps {
    jobId: string;
    applicationStatus?: 'APPROVED' | 'REJECTED' | 'PENDING' | string;
    hasInterview?: boolean;
    onReviewSubmit?: (review: { rating: number; comment: string }) => Promise<void>;
}

export default function JobReviewForm({ 
    jobId, 
    applicationStatus, 
    hasInterview, 
    onReviewSubmit 
}: JobReviewFormProps) {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    // Điều kiện nghiêm ngặt để được phép review sau phỏng vấn
    const canReview = (applicationStatus === 'APPROVED' || applicationStatus === 'REJECTED') && hasInterview;

    if (!canReview) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a star rating!");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please leave a short comment about your interview experience.");
            return;
        }

        try {
            setSubmitting(true);
            if (onReviewSubmit) {
                await onReviewSubmit({ rating, comment });
            } else {
                // Giả lập call API nếu không truyền prop
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            toast.success("Thank you! Your interview review has been submitted.");
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error("Failed to submit review. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100 font-sans mt-6">
            <h4 className="text-[16px] font-bold text-gray-900 mb-1">Share Your Interview Experience</h4>
            <p className="text-gray-500 text-xs mb-4">Since you finished an interview for this job, your feedback helps other candidates immensely.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating Selection */}
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-700 mr-2">Your Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            className="transition-transform active:scale-95 focus:outline-none"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <Star
                                size={22}
                                className={`${
                                    star <= (hover || rating)
                                        ? 'text-warning-500 fill-warning-500'
                                        : 'text-gray-300'
                                } transition-colors`}
                            />
                        </button>
                    ))}
                </div>

                {/* Comment Textarea */}
                <div>
                    <textarea
                        rows={3}
                        className="w-full p-4 text-[14px] bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-colors placeholder-gray-400 font-medium text-gray-700"
                        placeholder="How was the technical test? Were the interviewers professional and supportive?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}