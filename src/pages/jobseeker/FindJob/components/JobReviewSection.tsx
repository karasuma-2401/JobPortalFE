// src/pages/jobseeker/dashboard/interview/components/JobReviewSection.tsx
import { Star, MessageSquare } from 'lucide-react';
import JobReviewForm from './JobReviewForm';

// Giả định kiểu dữ liệu review nhận từ API
interface ReviewItem {
    id: string;
    reviewerName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface JobReviewSectionProps {
    jobId: string;
    reviews?: ReviewItem[];
    userApplicationStatus?: string; // lấy từ trạng thái ứng tuyển của user hiện tại
    userHasInterview?: boolean;
}

export default function JobReviewSection({
    jobId,
    reviews = [],
    userApplicationStatus,
    userHasInterview
}: JobReviewSectionProps) {
    
    // Tính điểm trung bình rating
    const averageRating = reviews.length 
        ? (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <div className="mt-8 border-t border-gray-100 pt-8 font-sans">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                    <h3 className="text-[18px] font-bold text-gray-900">Interview Reviews</h3>
                    <span className="bg-blue-50 text-primary-500 text-xs font-bold px-2 py-0.5 rounded-full">
                        {reviews.length}
                    </span>
                </div>

                {averageRating && (
                    <div className="flex items-center gap-1 bg-warning-50/50 px-3 py-1 rounded-lg border border-warning-100">
                        <Star size={16} className="text-warning-500 fill-warning-500" />
                        <span className="text-[14px] font-bold text-warning-700">{averageRating}</span>
                        <span className="text-xs text-gray-400">/ 5</span>
                    </div>
                )}
            </div>

            {/* Khối hiển thị Form Đánh Giá dành riêng cho Candidate thỏa mãn điều kiện */}
            <JobReviewForm 
                jobId={jobId} 
                applicationStatus={userApplicationStatus} 
                hasInterview={userHasInterview}
            />

            {/* Danh sách Reviews */}
            <div className="mt-6 space-y-4">
                {reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 bg-gray-50/30 rounded-2xl border border-dashed border-gray-100 text-center">
                        <MessageSquare className="text-gray-300 mb-2" size={24} />
                        <p className="text-gray-400 text-sm font-medium">No interview reviews yet. Be the first to share details!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="p-5 border border-gray-100 bg-white rounded-2xl shadow-sm space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[14px] text-gray-900">{review.reviewerName}</span>
                                <span className="text-xs text-gray-400">{review.createdAt}</span>
                            </div>
                            
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star} 
                                        size={14} 
                                        className={star <= review.rating ? "text-warning-500 fill-warning-500" : "text-gray-200"} 
                                    />
                                ))}
                            </div>
                            
                            <p className="text-gray-600 text-[14px] leading-relaxed font-medium">
                                {review.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}