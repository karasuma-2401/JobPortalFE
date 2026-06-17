import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useAuth from '../../../../contexts/auth/useAuth';
import { JobseekerService } from '../../../../services/jobseekerService';
import { ReviewService } from '../../../../services/reviewService';
import type {
    JobPostReview,
    JobPostReviewSummary,
} from '../../../../types/review';

const REVIEWABLE_APPLICATION_STATUSES = new Set([
    'REVIEWING',
    'ACCEPTED',
    'REJECTED',
]);

interface JobReviewsSectionProps {
    jobPostId: string;
    averageRating?: number;
    reviewCount?: number;
}

export default function JobReviewsSection({
    jobPostId,
    averageRating,
    reviewCount,
}: JobReviewsSectionProps) {
    const { user, isJobSeeker } = useAuth();
    const [reviews, setReviews] = useState<JobPostReview[]>([]);
    const [summary, setSummary] = useState<JobPostReviewSummary>({
        averageRating: averageRating ?? 0,
        reviewCount: reviewCount ?? 0,
    });
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [hasReviewableApplication, setHasReviewableApplication] =
        useState(false);

    const loadReviews = async () => {
        const [reviewPage, reviewSummary] = await Promise.all([
            ReviewService.listReviews(jobPostId, { limit: 5, offset: 0 }),
            ReviewService.getSummary(jobPostId, Boolean(user)),
        ]);
        setReviews(reviewPage.items);
        setSummary(reviewSummary);
    };

    const loadReviewEligibility = async () => {
        if (!user || !isJobSeeker) {
            setHasReviewableApplication(false);
            return;
        }

        const appliedJobs = await JobseekerService.getAppliedJobs(1, 100);
        const matchedApplication = appliedJobs.items.find(
            (job) => String(job.jobPostId || job.id) === String(jobPostId)
        );

        setHasReviewableApplication(
            Boolean(
                matchedApplication &&
                REVIEWABLE_APPLICATION_STATUSES.has(
                    matchedApplication.status?.toUpperCase()
                )
            )
        );
    };

    useEffect(() => {
        void loadReviews().catch(() => {
            setReviews([]);
        });
        void loadReviewEligibility().catch(() => {
            setHasReviewableApplication(false);
        });
    }, [jobPostId, user, isJobSeeker]);

    const canSubmitReview =
        isJobSeeker && (summary.eligibleToReview || hasReviewableApplication);

    const submitReview = async () => {
        if (!comment.trim()) {
            toast.error('Comment is required.');
            return;
        }
        setSubmitting(true);
        try {
            await ReviewService.createReview(jobPostId, {
                rating,
                comment: comment.trim(),
            });
            toast.success('Review submitted.');
            setComment('');
            await loadReviews();
        } catch (error) {
            toast.error((error as Error).message || 'Failed to submit review.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className='border-t border-gray-100 pt-8'>
            <div className='mb-5 flex items-center justify-between gap-4'>
                <div>
                    <h3 className='text-[18px] font-bold text-gray-900'>
                        Candidate Reviews
                    </h3>
                    <div className='mt-1 flex items-center gap-2 text-sm text-gray-500'>
                        <span className='inline-flex items-center gap-1 font-bold text-amber-500'>
                            <Star size={16} fill='currentColor' />
                            {(summary.averageRating ?? 0).toFixed(1)}
                        </span>
                        <span>{summary.reviewCount ?? 0} reviews</span>
                    </div>
                </div>
            </div>

            {canSubmitReview && (
                <div className='mb-6 rounded-xl border border-blue-100 bg-blue-50/40 p-4'>
                    <div className='mb-3 flex items-center gap-2'>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                onClick={() => setRating(value)}
                                className={`rounded p-1 ${
                                    value <= rating
                                        ? 'text-amber-500'
                                        : 'text-gray-300'
                                }`}
                            >
                                <Star size={20} fill='currentColor' />
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Share your interview experience...'
                        className='mb-3 min-h-[92px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                    />
                    <button
                        onClick={submitReview}
                        disabled={submitting}
                        className='rounded-lg bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:bg-primary-600 disabled:opacity-60'
                    >
                        Submit review
                    </button>
                </div>
            )}

            <div className='space-y-3'>
                {reviews.length === 0 ? (
                    <div className='rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-8 text-center text-sm text-gray-500'>
                        No reviews yet.
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className='rounded-xl border border-gray-100 bg-white p-4'
                        >
                            <div className='mb-2 flex items-center justify-between gap-3'>
                                <div>
                                    <p className='font-bold text-gray-900'>
                                        {review.authorName}
                                    </p>
                                    <p className='text-xs text-gray-400'>
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600'>
                                    <Star size={14} fill='currentColor' />
                                    {review.rating}
                                </span>
                            </div>
                            <p className='text-sm leading-6 text-gray-600'>
                                {review.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
