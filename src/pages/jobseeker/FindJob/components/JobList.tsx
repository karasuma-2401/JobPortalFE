import JobItem from "../../../../components/ui/JobItem"; 
import JobCard from "../../../../components/ui/JobCard";

interface JobData {
  id: string;
  title: string;
  companyName: string;
  type: string;
  isFeatured: boolean;
  logo: string;
  location: string;
  salary: string;
  daysRemaining: string;
}

interface JobListProps {
  jobs: JobData[];
  viewMode: "list" | "grid";
  savedJobIds: string[];
  onToggleSave: (id: string | number) => void;
  onJobDoubleClick: (id: string) => void; 
  onApplyClick: (id: string) => void; 
}

export default function JobList({ 
  jobs, 
  viewMode, 
  savedJobIds, 
  onToggleSave, 
  onJobDoubleClick,
  onApplyClick // bóc tách prop tại đây
}: JobListProps) {
  
  if (viewMode === "grid") {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            logo={job.logo}
            companyName={job.companyName}
            location={job.location}
            title={job.title}
            type={job.type}
            salary={job.salary}
            daysRemaining={job.daysRemaining} 
            isFeatured={job.isFeatured}
            onDoubleClick={() => onJobDoubleClick(job.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
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
          onDoubleClick={() => onJobDoubleClick(job.id)}
          
          onApplyClick={(id) => onApplyClick(String(id))} 
        />
      ))}
    </div>
  );
}