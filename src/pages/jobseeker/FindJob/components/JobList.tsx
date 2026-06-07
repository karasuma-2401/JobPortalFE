import JobItem from '../../../../components/ui/JobItem';

interface JobData {
    id: string;
    title: string;
    type: string;
    isFeatured: boolean;
    logo: string;
    location: string;
    salary: string;
    daysRemaining: string;
}

interface JobListProps {
    jobs: JobData[];
    viewMode: 'list' | 'grid';
    savedJobIds: string[];
    onToggleSave: (id: string | number) => void;
}

export default function JobList({
    jobs,
    viewMode,
    savedJobIds,
    onToggleSave,
}: JobListProps) {
    return (
        <div
            className={`mt-6 ${
                viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
            }`}
        >
            {jobs.map((job) => (
                <JobItem
                    key={job.id}
                    id={job.id}
                    logo={job.logo}
                    title={job.title}
                    type={job.type}
                    location={job.location}
                    salary={job.salary}
                    timeStatus={job.daysRemaining}
                    isFeatured={job.isFeatured}
                    isBookmarked={savedJobIds.includes(job.id)}
                    onBookmarkClick={onToggleSave}
                    onApplyClick={(id) => {
                        console.log(
                            `Xử lý nộp đơn ứng tuyển nhanh cho Job ID: ${id}`
                        );
                    }}
                />
            ))}
        </div>
    );
}
