import { useInterviews } from '../../../../hooks/useInterview'; 
import { Skeleton } from '../../../../components/ui/Skeleton';
import type { InterviewSession } from '../../../../types/interview';

// Component con cho trạng thái
const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'SCHEDULED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
    }`}>
        {status.replace('_', ' ')}
    </span>
);

export default function InterviewSchedulePage() {
    const { data: interviews, isLoading } = useInterviews();

    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <h1 className="text-2xl font-bold mb-6">My Interview Schedule</h1>
            
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
                </div>
            ) : (
                <div className="grid gap-4">
                    {interviews?.map((interview: InterviewSession) => (
                        <div key={interview.id} className="p-6 border border-gray-100 rounded-xl bg-white flex items-center justify-between">
                            {/* ... nội dung như cũ ... */}
                            <StatusBadge status={interview.status} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}