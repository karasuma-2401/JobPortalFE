import { privateApi, publicApi } from '../api/api';
import type {
    JobPostReview,
    JobPostReviewSummary,
    PagedJobPostReviews,
} from '../types/review';

interface ApiResponse<T> {
    data: T;
}

const unwrap = <T>(response: unknown): T => {
    const root = response as ApiResponse<T>;
    return root?.data ?? (response as T);
};

export const ReviewService = {
    listReviews: async (
        jobPostId: string | number,
        params?: { limit?: number; offset?: number }
    ): Promise<PagedJobPostReviews> => {
        return unwrap<PagedJobPostReviews>(
            await publicApi.get(`/jobpost/${jobPostId}/reviews`, { params })
        );
    },

    getSummary: async (
        jobPostId: string | number,
        authenticated = false
    ): Promise<JobPostReviewSummary> => {
        const api = authenticated ? privateApi : publicApi;
        return unwrap<JobPostReviewSummary>(
            await api.get(`/jobpost/${jobPostId}/reviews/summary`)
        );
    },

    createReview: async (
        jobPostId: string | number,
        payload: { rating: number; comment: string }
    ): Promise<JobPostReview> => {
        return unwrap<JobPostReview>(
            await privateApi.post(`/jobpost/${jobPostId}/reviews`, payload)
        );
    },

    updateReview: async (
        jobPostId: string | number,
        reviewId: number,
        payload: { rating?: number; comment?: string }
    ): Promise<JobPostReview> => {
        return unwrap<JobPostReview>(
            await privateApi.patch(
                `/jobpost/${jobPostId}/reviews/${reviewId}`,
                payload
            )
        );
    },

    deleteReview: async (
        jobPostId: string | number,
        reviewId: number
    ): Promise<void> => {
        await privateApi.delete(`/jobpost/${jobPostId}/reviews/${reviewId}`);
    },
};
