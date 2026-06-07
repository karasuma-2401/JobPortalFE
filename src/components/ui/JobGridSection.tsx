import JobCard from "./JobCard"; 

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

interface JobGridSectionProps {
  title: string;
  jobs: JobData[];
  onJobDoubleClick?: (id: string) => void;
}

export default function JobGridSection({ title, jobs, onJobDoubleClick }: JobGridSectionProps) {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="pt-6 space-y-5 text-left w-full">

      <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            onDoubleClick={() => onJobDoubleClick?.(job.id)}
          />
        ))}
      </div>
    </div>
  );
}