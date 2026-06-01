import { useState } from "react";
import { Pencil } from "lucide-react";
import JobAlertItem, { type JobAlertItemProps } from "./JobAlertItem";
import DashboardPagination from "../../../../components/ui/DashboardPagination";

export default function JobAlertPage() {
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages] = useState(12);   
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Gọi API lấy data cho trang: ${pageNumber}`);
  };

  const mockJobs: Omit<JobAlertItemProps, "isSelected" | "onSelect">[] = [
  { 
    id: "1", 
    logo: "https://logo.clearbit.com/google.com", 
    role: "Technical Support Specialist", 
    type: "Full Time", 
    location: "Idaho, USA", 
    salary: "$15K-$20K", 
    daysRemaining: "Job Expire" 
  },
  { 
    id: "2", 
    logo: "https://logo.clearbit.com/youtube.com", 
    role: "UI/UX Designer", 
    type: "Full Time", 
    location: "Minnesota, USA", 
    salary: "$10K-$15K", 
    daysRemaining: "4 Days Remaining" 
  },
];

  return (
    <div className="space-y-8 text-left animate-fade-in">
      <div className="flex items-center justify-between gap-6 pb-2 border-b border-gray-50">
        <div className="flex items-end gap-3">
          <h1 className="text-xl font-bold text-gray-900">Job Alerts</h1>
          <span className="text-sm font-medium text-gray-400 mb-0.5">(9 new jobs)</span>
        </div>
        <button className="flex items-center gap-2.5 px-6 py-3.5 text-[15px] font-bold text-primary-500 bg-blue-50 hover:bg-primary-500 hover:text-white rounded-lg transition-colors">
          <Pencil size={18} />
          Edit Job Alerts
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {mockJobs.map((job) => (
          <JobAlertItem 
            key={job.id} 
            {...job} 
            isSelected={selectedJobId === job.id}
            onSelect={() => setSelectedJobId(job.id === selectedJobId ? null : job.id)}
          />
        ))}
      </div>

      <DashboardPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}