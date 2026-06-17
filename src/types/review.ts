export interface JobPostReview {
    id: number;
    jobPostId: number;
    jobSeekerId: number;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt?: string;
}

export interface JobPostReviewSummary {
    averageRating: number;
    reviewCount: number;
    eligibleToReview?: boolean;
}

export interface PagedJobPostReviews {
    items: JobPostReview[];
    totalItems: number;
    page: number;
    size: number;
}
